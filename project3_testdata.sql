-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2020 at 06:34 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `courses`
--

-- --------------------------------------------------------

--
-- Table structure for table `advisor`
--

CREATE TABLE `advisor` (
  `advisor_id` int(255) UNSIGNED NOT NULL,
  `advisor_fname` varchar(255) NOT NULL,
  `advisor_lname` varchar(255) NOT NULL,
  `advisor_initial` varchar(255) DEFAULT NULL,
  `advisor_department` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `advisor`
--

INSERT INTO `advisor` (`advisor_id`, `advisor_fname`, `advisor_lname`, `advisor_initial`, `advisor_department`) VALUES
(1, 'David', 'North', 'B', 'CS');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` int(255) UNSIGNED NOT NULL,
  `course_dept` varchar(255) NOT NULL,
  `course_num` varchar(255) NOT NULL,
  `course_level` varchar(255) NOT NULL,
  `course_hours` varchar(255) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `course_desc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `course_dept`, `course_num`, `course_level`, `course_hours`, `course_name`, `course_desc`) VALUES
(1, 'Computer Science', 'CMSC-101', 'FR.', '3.0', 'Programming I', 'Learn Programming basics with C++'),
(2, 'Computer Science', 'CMSC-102', 'FR.', '3.0', 'Programming II', 'Learn more with C++ and OOP Concepts');

-- --------------------------------------------------------

--
-- Table structure for table `course_plan`
--

CREATE TABLE `course_plan` (
  `course_plan_id` int(255) UNSIGNED NOT NULL,
  `course_plan_last_updated_date` date DEFAULT NULL,
  `course_plan_total_hours_semester` int(100) DEFAULT NULL,
  `course_plan_total_hours_major` int(100) DEFAULT NULL,
  `course_plan_gpa_major` int(100) DEFAULT NULL,
  `course_plan_gpa_all_courses` int(100) DEFAULT NULL,
  `course_plan_grade` int(2) DEFAULT NULL,
  `student` int(255) UNSIGNED NOT NULL,
  `semester` int(255) UNSIGNED DEFAULT NULL,
  `course` int(255) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `course_plan`
--

INSERT INTO `course_plan` (`course_plan_id`, `course_plan_last_updated_date`, `course_plan_total_hours_semester`, `course_plan_total_hours_major`, `course_plan_gpa_major`, `course_plan_gpa_all_courses`, `course_plan_grade`, `student`, `semester`, `course`) VALUES
(1, '2020-10-05', 18, 18, 3, 3, NULL, 2, 2, 1),
(2, '2020-10-05', 18, 18, 3, 3, NULL, 3, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `course_semester`
--

CREATE TABLE `course_semester` (
  `course_semester_id` int(255) UNSIGNED NOT NULL,
  `course` int(255) UNSIGNED NOT NULL,
  `semester` int(255) UNSIGNED NOT NULL,
  `semester_grade` varchar(2) DEFAULT NULL,
  `semester_status` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `course_semester`
--

INSERT INTO `course_semester` (`course_semester_id`, `course`, `semester`, `semester_grade`, `semester_status`) VALUES
(1, 1, 2, NULL, NULL),
(2, 2, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `degree`
--

CREATE TABLE `degree` (
  `degree_id` int(255) UNSIGNED NOT NULL,
  `degree_name` varchar(255) NOT NULL,
  `degree_dept` varchar(255) NOT NULL,
  `degree_hours` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `degree`
--

INSERT INTO `degree` (`degree_id`, `degree_name`, `degree_dept`, `degree_hours`) VALUES
(1, 'CS W/ A and G', 'Computer Science', '85'),
(2, 'CS W/ Business', 'CS', '85');

-- --------------------------------------------------------

--
-- Table structure for table `degree_plan`
--

CREATE TABLE `degree_plan` (
  `degree_plan_id` int(255) UNSIGNED NOT NULL,
  `degree` int(255) UNSIGNED NOT NULL,
  `course` int(255) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `degree_plan`
--

INSERT INTO `degree_plan` (`degree_plan_id`, `degree`, `course`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `semester`
--

CREATE TABLE `semester` (
  `semester_id` int(255) UNSIGNED NOT NULL,
  `semester_name` varchar(255) NOT NULL,
  `semester_start` date NOT NULL,
  `semester_end` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `semester`
--

INSERT INTO `semester` (`semester_id`, `semester_name`, `semester_start`, `semester_end`) VALUES
(1, 'Spring 2021', '2021-01-01', '2021-05-01'),
(2, 'Fall 2020', '2020-08-13', '2020-11-19');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(255) UNSIGNED NOT NULL,
  `student_fname` varchar(255) NOT NULL,
  `student_lname` varchar(255) NOT NULL,
  `student_initial` varchar(255) DEFAULT NULL,
  `student_major` varchar(255) DEFAULT NULL,
  `student_graduation_date` date NOT NULL,
  `degree` int(255) UNSIGNED NOT NULL,
  `advisor` int(255) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `student_fname`, `student_lname`, `student_initial`, `student_major`, `student_graduation_date`, `degree`, `advisor`) VALUES
(2, 'Jason', 'Lonsinger', 'L', 'CS - W ANIM and GM', '2021-05-21', 1, 1),
(3, 'Ryan', 'Burnett', NULL, 'CS W/ Business', '2021-03-21', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(255) UNSIGNED NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `student` int(255) UNSIGNED DEFAULT NULL,
  `advisor` int(255) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_password`, `user_email`, `student`, `advisor`) VALUES
(3, 'jason', 'password', 'jason@com', 2, NULL),
(4, 'david', 'password', 'david@com', NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advisor`
--
ALTER TABLE `advisor`
  ADD PRIMARY KEY (`advisor_id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `course_plan`
--
ALTER TABLE `course_plan`
  ADD PRIMARY KEY (`course_plan_id`),
  ADD KEY `student` (`student`),
  ADD KEY `semester` (`semester`),
  ADD KEY `course` (`course`);

--
-- Indexes for table `course_semester`
--
ALTER TABLE `course_semester`
  ADD PRIMARY KEY (`course_semester_id`),
  ADD KEY `course` (`course`),
  ADD KEY `semester` (`semester`);

--
-- Indexes for table `degree`
--
ALTER TABLE `degree`
  ADD PRIMARY KEY (`degree_id`);

--
-- Indexes for table `degree_plan`
--
ALTER TABLE `degree_plan`
  ADD PRIMARY KEY (`degree_plan_id`),
  ADD KEY `degree` (`degree`),
  ADD KEY `course` (`course`);

--
-- Indexes for table `semester`
--
ALTER TABLE `semester`
  ADD PRIMARY KEY (`semester_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `advisor` (`advisor`),
  ADD KEY `degree` (`degree`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `student` (`student`),
  ADD KEY `advisor` (`advisor`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advisor`
--
ALTER TABLE `advisor`
  MODIFY `advisor_id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `course_id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `course_plan`
--
ALTER TABLE `course_plan`
  MODIFY `course_plan_id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `course_semester`
--
ALTER TABLE `course_semester`
  MODIFY `course_semester_id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `degree`
--
ALTER TABLE `degree`
  MODIFY `degree_id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `degree_plan`
--
ALTER TABLE `degree_plan`
  MODIFY `degree_plan_id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `semester`
--
ALTER TABLE `semester`
  MODIFY `semester_id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course_plan`
--
ALTER TABLE `course_plan`
  ADD CONSTRAINT `course_plan_ibfk_1` FOREIGN KEY (`student`) REFERENCES `student` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `course_plan_ibfk_2` FOREIGN KEY (`semester`) REFERENCES `semester` (`semester_id`),
  ADD CONSTRAINT `course_plan_ibfk_3` FOREIGN KEY (`course`) REFERENCES `course` (`course_id`);

--
-- Constraints for table `course_semester`
--
ALTER TABLE `course_semester`
  ADD CONSTRAINT `course_semester_ibfk_1` FOREIGN KEY (`course`) REFERENCES `course` (`course_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `course_semester_ibfk_2` FOREIGN KEY (`semester`) REFERENCES `semester` (`semester_id`) ON DELETE CASCADE;

--
-- Constraints for table `degree_plan`
--
ALTER TABLE `degree_plan`
  ADD CONSTRAINT `degree_plan_ibfk_1` FOREIGN KEY (`degree`) REFERENCES `degree` (`degree_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `degree_plan_ibfk_2` FOREIGN KEY (`course`) REFERENCES `course` (`course_id`) ON DELETE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`advisor`) REFERENCES `advisor` (`advisor_id`),
  ADD CONSTRAINT `student_ibfk_2` FOREIGN KEY (`degree`) REFERENCES `degree` (`degree_id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`student`) REFERENCES `student` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`advisor`) REFERENCES `advisor` (`advisor_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
