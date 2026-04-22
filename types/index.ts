// ============================================================
// ASMS - Academic & Student Management System
// CADD Centre Lanka - Type Definitions
// ============================================================

export type UserRole = 'admin' | 'academic_manager' | 'trainer' | 'student' | 'coordinator'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  role: UserRole
  avatar_url: string | null
  student_id: string | null
  education_background: string | null
  specialization: string | null
  bio: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export type CourseLevel = 'Proficient Certificate' | 'Master Certificate' | 'Expert Certificate'

export interface Module {
  id: string
  course_id: string
  title: string
  description: string | null
  duration_hours: number
  order_index: number
  topics: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  slug: string
  title: string
  description: string
  short_description: string | null
  price: number
  original_price: number | null
  level: CourseLevel
  category: string
  total_hours: number
  image_url: string | null
  tags: string[]
  is_active: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
  modules?: Module[]
}

export type BatchMode = 'classroom' | 'online' | 'hybrid'

export interface Batch {
  id: string
  course_id: string
  name: string
  start_date: string
  end_date: string | null
  schedule: string
  mode: BatchMode
  venue: string | null
  seats: number
  enrolled_count: number
  is_active: boolean
  created_at: string
  updated_at: string
  course?: Course
  trainer_allocations?: TrainerAllocation[]
}

export interface TrainerAllocation {
  id: string
  batch_id: string
  trainer_id: string
  module_id: string | null
  created_at: string
  trainer?: Profile
  module?: Module
}

export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  batch_id: string | null
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  amount_paid: number
  enrolled_at: string
  created_at: string
  updated_at: string
  courses?: Course
  profiles?: Profile
  batches?: Batch
  batch?: Batch
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused'

export interface AttendanceRecord {
  id: string
  enrollment_id: string
  batch_id: string
  date: string
  status: AttendanceStatus
  notes: string | null
  marked_by: string
  created_at: string
  enrollment?: Enrollment
}

export interface ModuleProgress {
  id: string
  enrollment_id: string
  module_id: string
  status: 'not_started' | 'in_progress' | 'completed'
  score: number | null
  practical_score: number | null
  theory_score: number | null
  completed_at: string | null
  created_at: string
  updated_at: string
  module?: Module
}

export type AssessmentType = 'module_test' | 'practical' | 'final_project'

export interface Assessment {
  id: string
  enrollment_id: string
  module_id: string | null
  type: AssessmentType
  title: string
  marks_obtained: number | null
  total_marks: number
  grade: string | null
  conducted_at: string | null
  notes: string | null
  created_at: string
  updated_at: string
  module?: Module
}

export type CertificateType = 'course_completion' | 'professional_bim'

export interface Certificate {
  id: string
  enrollment_id: string
  user_id: string
  course_id: string
  certificate_number: string
  type: CertificateType
  issued_at: string
  qr_code_data: string
  pdf_url: string | null
  created_at: string
  profile?: Profile
  course?: Course
}

export type ResourceType = 'ebook' | 'video' | 'guide' | 'document'

export interface LearningResource {
  id: string
  module_id: string | null
  course_id: string | null
  title: string
  description: string | null
  type: ResourceType
  url: string
  is_active: boolean
  created_at: string
  updated_at: string
  module?: Module
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  is_read: boolean
  replied_at: string | null
  created_at: string
}

export interface EventAgendaItem {
  time?: string
  title: string
  description?: string
  speaker?: string
}

export interface EventSpeaker {
  name: string
  title?: string
  role?: string
  company?: string
  bio?: string
  image_url?: string
}

export interface Event {
  id: string
  slug: string
  title: string
  description: string
  short_description: string | null
  start_date: string
  end_date: string | null
  start_time: string | null
  end_time: string | null
  venue: string
  capacity: number
  booked_count: number
  price: number
  category: string
  organizer: string
  image_url: string | null
  tags: string[]
  agenda: EventAgendaItem[]
  speakers: EventSpeaker[]
  is_active: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface EventRegistration {
  id: string
  user_id: string
  event_id: string
  quantity: number
  status: 'pending' | 'confirmed' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  amount_paid: number
  created_at: string
  updated_at: string
  event?: Event
  profile?: Profile
}


export interface StudentLead {
  id: string
  full_name: string
  email: string
  phone: string | null
  interested_course: string | null
  preferred_level: CourseLevel | null
  status: 'new' | 'contacted' | 'qualified' | 'enrolled' | 'lost'
  notes: string | null
  assigned_to: string | null
  created_at: string
  updated_at: string
}

export type AcademicRecordType = 'assignment' | 'practical_project' | 'software_skill'

export interface AcademicRecord {
  id: string
  enrollment_id: string
  module_id: string | null
  type: AcademicRecordType
  title: string
  status: 'not_started' | 'in_progress' | 'completed'
  score: number | null
  max_score: number | null
  notes: string | null
  evidence_url: string | null
  assessed_at: string | null
  created_at: string
  updated_at: string
  module?: Module
}

export interface DashboardStats {
  totalStudents: number
  totalCourses: number
  totalBatches: number
  totalTrainers: number
  totalEnrollments: number
  totalRevenue: number
  certificatesIssued: number
  monthlyRevenue: { month: string; revenue: number }[]
  recentEnrollments: Enrollment[]
  attendanceRate: number
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface EnrollmentReport {
  course_title: string
  batch_name: string
  total_enrolled: number
  completed: number
  pending: number
  cancelled: number
  revenue: number
}

export interface AttendanceReport {
  student_name: string
  student_id: string
  batch_name: string
  total_sessions: number
  present: number
  absent: number
  attendance_percentage: number
}
