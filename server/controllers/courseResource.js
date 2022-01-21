import express from "express";
import mongoose from "mongoose";
import final_csv from "../csv.js"
import { updateCourse } from "./course.js";
import CourseResource from "../models/courseResource.js";

const router = express.Router();

export const createResource = async (req, res) => {
  const resource = req.body;

  const newResource = new CourseResource({
    ...resource,
    createdAt: new Date().toISOString(),
  });

  try {
    await newResource.save();
    res.status(201).json({newResource});

    //回傳之後，更新該課程的總評價 涼/甜/收穫
    // const course_id=feedback.course;
    // const courseFeedBacks = await CourseFeedBack.find({"course":course_id});	
    // updateCourse(courseFeedBacks,course_id);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getCourseResource = async (req, res) => {
	const { course_id } = req.body;
  try {
    const courseResources = await CourseResource.find({"course":course_id});
    // console.log("course_data",course_data);
    res.status(200).json({resource:courseResources});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default router;
