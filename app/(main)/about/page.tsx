import { GraduationCap, Users, Award, BookOpen, Target, Heart } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { value: "500+", label: "Students Trained" },
    { value: "50+", label: "Courses Offered" },
    { value: "20+", label: "Expert Instructors" },
    { value: "95%", label: "Satisfaction Rate" },
  ]

  const team = [
    { name: "Mr. Imamdeen", role: "Lead Web Development Instructor", bio: "Full-stack developer with 10+ years experience in React, Node.js, and cloud architecture." },
    { name: "Ms. Hiruni Piyumika", role: "Data Science Lead", bio: "Data scientist and ML engineer with expertise in Python, TensorFlow, and enterprise analytics." },
    { name: "Ms. Amaya Silva", role: "UI/UX Design Instructor", bio: "Product designer who has worked with leading tech companies across South Asia." },
  ]

  const values = [
    { icon: Target, title: "Excellence", desc: "We set the highest standards in curriculum design and teaching quality." },
    { icon: Heart, title: "Student-First", desc: "Every decision we make puts our students' growth and success at the center." },
    { icon: Users, title: "Community", desc: "Learning is better together — we foster a collaborative, inclusive environment." },
    { icon: Award, title: "Industry-Relevant", desc: "Our curriculum evolves with the industry to ensure you learn what employers need." },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A1A2F] via-[#13293D] to-[#1B3A57] text-white py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-2xl mb-6">
            <GraduationCap className="h-8 w-8 text-blue-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Scholar Sync</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            We are Sri Lanka{"'"}s premier technology education platform, dedicated to transforming careers through world-class training, mentorship, and community.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16 px-4 border-b">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">{value}</p>
                <p className="text-gray-600 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-blue-600 font-semibold uppercase tracking-wide text-sm mb-3">Our Mission</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-5">Empowering the Next Generation of Tech Leaders</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded with the vision of democratising quality technology education in Sri Lanka, Scholar Sync bridges the gap between academic learning and industry demands.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our programmes are designed alongside industry partners to ensure every graduate is job-ready from day one. We believe education should be transformative, practical, and accessible.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 text-white">
              <BookOpen className="h-10 w-10 mb-5 text-blue-200" />
              <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
              <p className="text-blue-100 leading-relaxed">
                To become South Asia{"'"}s most trusted technology education platform, producing graduates who lead innovation in global companies and local startups alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-500 max-w-xl mx-auto">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Instructors</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Industry professionals committed to your growth</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map(({ name, role, bio }) => (
              <div key={name} className="bg-white rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {name.split(" ").pop()?.charAt(0)}
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{name}</h3>
                <p className="text-blue-600 text-sm font-medium mt-1 mb-3">{role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-blue-200 mb-8">Join hundreds of students transforming their careers with Scholar Sync</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/courses" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold transition-colors">Browse Courses</a>
            <a href="/contact" className="border border-white/40 text-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold transition-colors">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  )
}
