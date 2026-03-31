-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2026 at 03:00 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1=active,0=inactive',
  `created_at` datetime(6) DEFAULT current_timestamp(6),
  `updated_at` datetime(6) DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `status`, `created_at`, `updated_at`) VALUES
(1, 'ram', 'ram@gmail.com', '$2b$10$LTHPWysxtiJa8Dz0FaO2GOmS6f9e.TwHKbreg24friv1.kFxXwCK.', 1, '2026-03-27 06:10:02.000000', '2026-03-27 06:10:02.000000'),
(2, 'mohan', 'mohan@gmail.com', '$2b$10$fhK9E2zJVC1zLcoeQdbBv.A4ah25vf8MiS2MH0Xue4i/MO2kyMfSy', 1, '2026-03-27 06:16:39.000000', '2026-03-27 06:16:39.000000'),
(5, 'Shyam', 'shyam@abc.com', '$2b$10$AE.orpqlAUb99RxtqsGbeOLr3xVPBoCYQtdF4d/QThyfESams3UTu', 1, '2026-03-27 13:06:28.000000', '2026-03-27 13:06:28.000000'),
(6, 'Joe', 'joe@abc.com', '$2b$10$7mbtFol0CwE2IxixuRaWteMO1dHtuBSAPJcd9c4SI3/ALjOv6w9Yq', 1, '2026-03-27 13:10:09.000000', '2026-03-27 13:10:09.000000'),
(7, 'Alex', 'alex@abc.com', '$2b$10$r4bzv9T0DulyeSkycdpE7.Q8vvS1wNM2VhAODJFa/qHsn61uHvGIu', 1, '2026-03-27 13:13:25.000000', '2026-03-27 13:13:25.000000'),
(8, 'Gaurav', 'gaurav@abc.com', '$2b$10$qn7ENgy5zVrx30Sz4VZFsOAr8ZBa0o1Gfp91gS5HiXM/jsy8F.Ggm', 1, '2026-03-30 05:59:02.000000', '2026-03-30 05:59:02.000000'),
(9, 'Shobhit', 'shobhit@abc.com', '$2b$10$tV28w3JdUVCbeFBHzoH3FODUedMFc9NaCHCu3lqlqADXufp/1f0aO', 1, '2026-03-30 06:11:26.363000', '2026-03-30 06:11:26.363000'),
(10, 'Lokesh', 'lokesh@abc.com', '$2b$10$2zTGvpVNfh0pHTBqFeMIhuUUvSl6/J37tsrVThPOUiSaCVQ1SO8QK', 1, '2026-03-30 06:12:55.518000', '2026-03-30 06:12:55.518000'),
(11, 'Ema', 'ema@abc.com', '$2b$10$50ioJClQMNjz0Lsytwz7U.z23PFgHNEBoFddNYYnZ.dB8rhHyfEdG', 1, '2026-03-31 11:21:05.180000', '2026-03-31 11:21:05.180000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
