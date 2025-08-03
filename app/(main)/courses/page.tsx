"use client";
import { Input } from "@/components/ui/input";
import { getCourses, initializeData } from "@/lib/data";
import { Course } from "@/types";
import { ArrowRight, Clock, Search, Star, Users } from "lucide-react";
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
      <div className="w- h-[75vh] bg-gray-400 flex flex-col items-center justify-center ">
        <div className="w-3/4 flex flex-col items-start justify-center gap-4">
          <h1 className="font-bold text-4xl text-center lg:text-left">
            Discover Expert-Led Courses <br /> to advance your career
          </h1>
          <div className="flex flex-row items-center gap-2 ml-2">
            <Search className="h-4 w-4 -mr-8 text-slate-700" />
            <Input
              type="search"
              placeholder="Enter Course"
              className="pl-10 w-72 border border-slate-700 text-slate-700 placeholder:text-slate-700/60"
            />
            <button className="bg-action-blue/70 px-4 py-1 text-slate-700/80 rounded-md border border-slate-700/80">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center -mt-8">
        <div className="w-10/12 h-[10vh] bg-white shadow-xl flex flex-row items-center justify-between px-12 rounded-sm">
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
      </div>
      <div className="w-full h-fit">
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
                  <button
                    className="w-full flex items-center justify-center gap-2 bg-action-blue text-white text-base font-medium rounded-sm py-2 hover:bg-action-blue/90 transition"
                    onClick={() => {
                      Router.push(`/courses/${course.slug}`);
                    }}
                  >
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
