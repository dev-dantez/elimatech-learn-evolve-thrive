
import { supabase } from '@/integrations/supabase/client';

export async function createCourse(courseData: any, userId: string) {
  const { data, error } = await supabase
    .from('courses')
    .insert({
      ...courseData,
      tutor_id: userId,
      created_at: new Date().toISOString(),
      is_published: false,
    })
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateCourse(courseId: string, courseData: any) {
  const { data, error } = await supabase
    .from('courses')
    .update(courseData)
    .eq('id', courseId)
    .select();

  if (error) throw error;
  return data[0];
}

export async function publishCourse(courseId: string) {
  const { data, error } = await supabase
    .from('courses')
    .update({ is_published: true })
    .eq('id', courseId)
    .select();

  if (error) throw error;
  return data[0];
}

export async function getTutorCourses(tutorId: string) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('tutor_id', tutorId);

  if (error) throw error;
  return data;
}

export async function getCourseEnrollments(courseId: string) {
  const { data, error } = await supabase
    .from('enrollments')
    .select('*, users!inner(*)')
    .eq('course_id', courseId);

  if (error) throw error;
  return data;
}

export async function initiatePayment(paymentData: any) {
  const response = await fetch('/api/process-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });

  return await response.json();
}

export async function getPaymentsByTutor(tutorId: string) {
  const { data: courses } = await supabase
    .from('courses')
    .select('id')
    .eq('tutor_id', tutorId);

  if (!courses || courses.length === 0) return [];

  const courseIds = courses.map(course => course.id);
  
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .in('course_id', courseIds);

  if (error) throw error;
  return data;
}

export async function getTutorEarnings(tutorId: string) {
  const { data: courses } = await supabase
    .from('courses')
    .select('id')
    .eq('tutor_id', tutorId);

  if (!courses || courses.length === 0) return { totalEarnings: 0, payments: [] };

  const courseIds = courses.map(course => course.id);
  
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .in('course_id', courseIds)
    .eq('status', 'completed');

  if (error) throw error;
  
  const totalEarnings = data.reduce((sum, payment) => sum + (payment.amount || 0), 0);
  
  return { totalEarnings, payments: data };
}
