"use client";
import { getCourses, initializeData } from "@/lib/data";
import { Course } from "@/types";
import { ArrowRight, Clock, Star, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const Router = useRouter(); 

  useEffect(() => {
    initializeData();
    setCourses(getCourses());
  }, []);

  return (
    <div className="w-full h-fit">
      <div className="w-full h-screen bg-gradient-to-br from-deep-sky/30 via-action-blue/40 to-blue-black flex items-center justify-center py-16 px-4 sm:px-8 lg:px-20">
        <div className="max-w-4xl w-full flex flex-col items-center justify-center text-center gap-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
            Explore Our Courses
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg w-full sm:w-10/12">
            Discover expert-led courses designed to advance your career and
            expand your skills.
          </p>
          <input
            type="text"
            placeholder="Search Courses, Instructors or topics"
            className="w-full sm:w-10/12 md:w-8/12 bg-white px-4 py-3 rounded-lg text-sm shadow focus:outline-none focus:ring-2 focus:ring-action-blue"
          />
        </div>
      </div>
      <div className="w-full h-fit">
        <div className="w-full h-[10vh] bg-white shadow-xl flex flex-row items-center justify-evenly">
          <div className="w-3/12 flex flex-row items-center justify-center gap-3 ">
            <select
              name=""
              id=""
              className="w-1/2 py-2 px-1 rounded-sm bg-white border border-gray-500/50 text-sm"
            >
              <option value="all" selected>
                All Categories
              </option>
            </select>
            <select
              name=""
              id=""
              className="w-1/2 py-2 px-1 rounded-sm bg-white border border-gray-500/50 text-sm"
            >
              <option value="all">All Levels</option>
            </select>
          </div>
          <div className="w-1/3 flex flex-row items-center justify-center gap-3">
            <p className="text-gray-700 text-sm text-nowrap">2 courses found</p>
            <select
              name=""
              id=""
              className="w-1/3 py-2 border border-gray-500/50 rounded-sm text-sm px-1"
            >
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        <div className="w-full pt-8 px-[5vw] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            return (
              // card start
              <div
                key={course.id}
                className="bg-white shadow-sm rounded-md w-full flex flex-col px-4 py-6 items-stretch justify-between transition hover:shadow-md"
              >
                {/* Image and badges */}
                <div className="w-full aspect-[4/3] bg-gray-300 rounded-sm relative overflow-hidden">
                  {/* difficulty badge */}
                  <div className="absolute top-0 left-0 mt-2 ml-2 px-2 text-xs md:text-sm bg-action-blue text-white text-center rounded-full">
                    {course.level}
                  </div>
                  {/* duration badge */}
                  <div className="absolute top-0 right-0 mt-2 mr-2 px-2 flex items-center gap-1 bg-gray-200 rounded-full text-xs md:text-sm text-gray-500">
                    <Clock className="size-4 md:size-5" />
                    {course.duration}
                  </div>
                  {/* discount badge */}
                  <div className="absolute bottom-0 left-0 mb-2 ml-2 px-2 bg-red-700 text-white text-xs md:text-sm rounded-full">
                    {"Save " +
                      Math.floor(
                        100 -
                          ((course.price ?? 0) / (course.originalPrice ?? 1)) *
                            100
                      ) +
                      "%"}
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 mt-4 flex flex-col justify-between">
                  {/* Rating and category */}
                  <div className="flex items-center justify-between text-gray-400 text-sm mb-2">
                    <p>{course.category}</p>
                    <div className="flex items-center gap-1">
                      <Star className="text-amber-400 size-4 md:size-5" />
                      {course.rating}{" "}
                      <span className="text-xs text-gray-400">
                        ({course.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Title, subtitle, instructor */}
                  <div className="mb-4">
                    <h1 className="text-lg md:text-xl font-bold mb-2">
                      {course.title}
                    </h1>
                    <h2 className="text-sm text-gray-500 mb-2">
                      {course.description}
                    </h2>
                    <p className="text-sm font-medium text-gray-500">
                      by: {course.instructor}
                    </p>
                  </div>

                  {/* Price section */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 text-sm">
                    {/* enrolled */}
                    <div className="flex items-center gap-1 text-gray-500 mb-2 sm:mb-0">
                      <Users className="size-4" />
                      {course.enrolledCount} / {course.seats} enrolled
                    </div>
                    {/* prices */}
                    <div className="flex flex-col items-start sm:items-end">
                      <p className="line-through text-gray-500 text-sm">
                        Rs. {course.originalPrice?.toLocaleString()}
                      </p>
                      <p className="text-lg font-bold text-action-blue">
                        Rs. {course.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {course.tags.map((tag, index) => (
                      <p
                        key={index}
                        className="font-medium bg-gray-200 px-2 py-1 rounded-sm text-xs"
                      >
                        {tag}
                      </p>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="w-full flex items-center justify-center gap-2 bg-action-blue text-white text-base font-medium rounded-sm py-2 hover:bg-action-blue/90 transition"
                  onClick={() => {Router.push(`/courses/${course.slug}`)}}>
                    View Course <ArrowRight />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
