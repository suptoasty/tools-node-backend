-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 10, 2020 at 11:02 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `courses`
--

--
-- Dumping data for table `advisor`
--

INSERT INTO `advisor` (`advisor_id`, `advisor_fname`, `advisor_lname`, `advisor_initial`, `advisor_department`) VALUES
(1, 'David', 'North', 'B', 'CMSC');

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `course_dept`, `course_num`, `course_level`, `course_hours`, `course_name`, `course_desc`) VALUES
(1, 'Computer Science', 'CMSC-101', 'FR.', '3.0', 'Programming I', 'Learn Programming basics with C++'),
(2, 'Computer Science', 'CMSC-102', 'FR.', '3.0', 'Programming II', 'Learn more with C++ and OOP Concepts');

--
-- Dumping data for table `degree`
--

INSERT INTO `degree` (`degree_id`, `degree_name`, `degree_dept`, `degree_hours`) VALUES
(1, 'CS w/ Gaming and Animation', 'CMSC', '85'),
(2, 'CS w/ Business', 'CMSC', '85'),
(3, 'CS w/ Cybersecurity', 'CMSC', '85');

--
-- Dumping data for table `degree_plan`
--

INSERT INTO `degree_plan` (`degree_plan_id`, `degree_plan_degree`, `degree_plan_course`) VALUES
(1, 2, 1),
(2, 2, 2),
(3, 3, 1),
(4, 3, 2),
(5, 1, 1),
(6, 1, 2);

--
-- Dumping data for table `term`
--

INSERT INTO `term` (`term_id`, `term_name`, `term_abbr`) VALUES
(1, 'Fall', 'FA'),
(2, 'Spring', 'SP'),
(3, 'Winter', 'WI'),
(4, 'Summer', 'SU');

--
-- Dumping data for table `course_term`
--

INSERT INTO `course_term` (`course_id`, `term_id`) VALUES
(1, 1),
(2, 2);

--
-- Dumping data for table `semester`
--

INSERT INTO `semester` (`semester_id`, `semester_name`, `semester_start`, `semester_end`, `semester_term`) VALUES
(1, 'Fall 2020', '2020-08-13', '2020-11-21', 1),
(2, 'Spring 2021', '2021-01-24', '2021-05-08', 2),
(3, 'Winter 2020', '2020-11-30', '2020-12-18', 3),
(4, 'Fall 2017', '2017-08-27', '2017-12-15', 1),
(5, 'Spring 2018', '2018-01-07', '2018-04-20', 2);

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `student_fname`, `student_lname`, `student_initial`, `student_graduation_date`, `student_degree`, `student_advisor`) VALUES
(1, 'Nathan', 'Woodruff', 'D', '2021-04-30', 3, 1),
(2, 'Jason', 'Lonsinger', 'L', '2021-04-30', 1, 1),
(3, 'Ryan', 'Burnett', NULL, '2021-04-30', 2, 1),
(4, 'Lane', 'Simpson', NULL, '2021-04-30', 1, 1);

--
-- Dumping data for table `course_plan`
--

INSERT INTO `course_plan` (`course_plan_id`, `course_plan_last_updated`, `course_plan_student`) VALUES
(1, '2020-10-10 10:10:10', 1),
(2, NULL, 3),
(3, NULL, 2),
(4, NULL, 4);

--
-- Dumping data for table `course_plan_item`
--

INSERT INTO `course_plan_item` (`course_plan_item_id`, `course_plan_item_grade`, `course_plan_item_status`, `course_plan_item_plan`, `course_plan_item_semester`, `course_plan_item_course`) VALUES
(1, 100, 'Complete', 1, 4, 1),
(2, 80, 'Complete', 1, 5, 2);

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_password`, `user_email`, `user_student`, `user_advisor`) VALUES
(18, 'jason.lonsinger', 'password', 'jason.lonsinger@eagles.oc.edu', 2, NULL),
(19, 'nathan.woodruff', 'password', 'nathan.woodruff@eagles.oc.edu', 1, NULL),
(20, 'lane.simpson', 'password', 'lane.simpson@eagles.oc.edu', 4, NULL),
(21, 'ryan.burnett', 'password', 'ryan.burnett@eagles.oc.edu', 3, NULL),
(22, 'david.north', 'password', 'david.north@oc.edu', NULL, 1);
COMMIT;