"use client";

import { useEffect, useState } from "react";
import { Course } from "@/types";
import { getCourseBySlug } from "@/lib/data";
import {
  Calendar,
  CheckCircle,
  Clock,
  DownloadIcon,
  Heart,
  Loader2,
  Medal,
  ShareIcon,
  Star,
  Unlink,
  Users,
} from "lucide-react";

export default function Page({ params }: { params: { slug: string } }) {
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data: Course | undefined = await getCourseBySlug(params.slug);
        if (!data) {
          setNotFound(true);
        } else {
          setCourse(data);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
        <p className="text-xl font-semibold text-gray-700">Loading Course...</p>
      </div>
    );
  } 
  
  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <Unlink className="w-16 h-16 text-gray-400" />
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</p>
          <p className="text-gray-600">{`The course you're looking for doesn't exist.`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <p className="text-sm text-gray-500 font-medium">
            <span className="hover:text-gray-700 cursor-pointer">Home</span>
            <span className="mx-2">/</span>
            <span className="hover:text-gray-700 cursor-pointer">Courses</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-semibold">{course?.title}</span>
          </p>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
              {/* Tags and Rating */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  {course?.level}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  {course?.category}
                </span>
                <div className="flex items-center gap-2 ml-auto">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-semibold text-gray-900">{course?.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({course?.reviews?.toLocaleString()} reviews)
                  </span>
                </div>
              </div>

              {/* Title and Description */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {course?.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {course?.description}
              </p>

              {/* Course Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{course?.enrolledCount?.toLocaleString()}</span>
                  <span>students enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="font-medium">{course?.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span>Starts <span className="font-medium">{course?.startDate}</span></span>
                </div>
              </div>

              {/* Course Preview Image */}
              <div className="w-full h-64 md:h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold">Course Preview</p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex">
                {['Overview', 'Curriculum', 'Instructor', 'Reviews'].map((tab, index) => (
                  <button
                    key={tab}
                    className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                      index === 0
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-r border-gray-200 last:border-r-0'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{`What You'll Learn`}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course?.syllabus.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Details */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Course Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Schedule</p>
                  <p className="text-gray-600">{course?.schedule}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Duration</p>
                  <p className="text-gray-600">{course?.duration}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Start Date</p>
                  <p className="text-gray-600">{course?.startDate}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">End Date</p>
                  <p className="text-gray-600">{course?.endDate}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Topics Covered</h3>
              <div className="flex flex-wrap gap-3">
                {course?.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 top-6">
              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-lg text-gray-500 line-through">
                    Rs. {course?.originalPrice?.toLocaleString()}
                  </span>
                  <span className="text-3xl md:text-4xl font-bold text-blue-600">
                    Rs. {course?.price?.toLocaleString()}
                  </span>
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                  Save {Math.floor(100 - ((course?.price ?? 0) / (course?.originalPrice ?? 1)) * 100)}%
                </div>
              </div>

              {/* Enrollment Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-gray-700">Seats Available</span>
                  <span className="text-sm font-bold text-gray-900">
                    {course?.seats != null && course?.enrolledCount != null
                      ? course.seats - course.enrolledCount
                      : 0}{" "}
                    of {course?.seats ?? 0}
                  </span>
                </div>

                {course?.seats && course?.enrolledCount != null && (
                  <>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((course.enrolledCount / course.seats) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-center text-gray-600">
                      {Math.min((course.enrolledCount / course.seats) * 100, 100).toFixed(1)}% Enrolled
                    </p>
                  </>
                )}
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
                Enroll Now
              </button>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="font-medium">Save</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <ShareIcon className="w-4 h-4" />
                  <span className="font-medium">Share</span>
                </button>
              </div>

              {/* Features */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                {[
                  { icon: CheckCircle, text: "Lifetime Access", color: "text-green-500" },
                  { icon: Medal, text: "Completion Certificate", color: "text-purple-500" },
                  { icon: CheckCircle, text: "30-day Money-back Guarantee", color: "text-green-500" },
                  { icon: CheckCircle, text: "Mobile and Desktop Access", color: "text-green-500" },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Features */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Course Features</h3>
              <div className="space-y-4">
                {[
                  { icon: Clock, text: `${course?.duration} total`, color: "text-blue-500" },
                  { icon: DownloadIcon, text: "Downloadable Resources", color: "text-green-500" },
                  { icon: Medal, text: "Certificate of Completion", color: "text-purple-500" },
                  { icon: Users, text: "Community Access", color: "text-orange-500" },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    <span className="text-sm text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
