-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2025 at 04:03 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skyflix`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, NULL, NULL, '$2y$10$O4hJfFyswywTcJKkDMwGSungycwce5O8NHALFVVc7C45mDRf2it1S', '2025-11-14 07:15:01'),
(2, 'elton', 'eltonjohnBelangel@gmail.com', '$2y$10$imc89UiDXnlO9hiSTynIw.yzPMUZKPDKLNPc0/wnCkxcgNBEMscvW', '2025-11-14 09:00:07'),
(3, 'melissa1', 'eltonjohl@gmail.com', '$2y$10$5/80Tt40Yq.Dwr6z7agop.H56GiXH.y/c57lML1o1p4k5h.Vmr9Ze', '2025-11-14 09:01:16'),
(4, 'gerome', 'gerom@gmail.com', '$2y$10$DhmJSG96JHk4Rbg6qvovwe.125z0FXRNgrK1FmoAsMN2Qdjyw0TCm', '2025-11-14 09:03:21'),
(5, 'qwert@', 'lerom@gmail.com', '$2y$10$Uk6imQW0Q8dSFr5nhXHnleaF8BwIFzO.o6FQc12DVnZn5hRwh8ghO', '2025-11-14 09:17:37'),
(6, 'admin', 'geromy@gmail.com', '$2y$10$uDqIXuGNCGI9LQ6KI.sIcuGa96019qrQ9RZpLPGc3BZr9bGbNAn0C', '2025-11-14 09:29:16'),
(7, 'jushua', 'geromr@gmail.com', '$2y$10$DekX0e7wHzpZxqrJzItnBeE0u3t/ioQzpCFUCOLt1GPVGrRYJRVzW', '2025-11-15 14:03:32'),
(8, 'melissa12', 'mel@gmail.com', '$2y$10$hU5jPLeqiHUs7OADNQHr7uq3x9hmg54/h6rkmki4mUmaFN8sMFhNa', '2025-11-15 14:13:45'),
(9, 'mel3', 'mel2@gmail.com', '$2y$10$nJqUWvUSm6FpdrpMNv4T6usM631QcOjt1/Vuqe3hhb3LlSFlrDEsW', '2025-11-15 14:20:20'),
(10, 'Melissa', 'mel123@gmail.com', '$2y$10$8Hpzkqiep2K4kERfrBGuruMt4V/1hgAdTwi4NckLpbmYFKLLmfXee', '2025-11-16 01:51:55'),
(11, 'hthtt', 'mel45@gmail.com', '$2y$10$NIbaLYguxSWHbKvMKnIKXu12hHpTpvarjJ.SNYZCTjyTp9vcxh26K', '2025-11-16 01:56:28'),
(12, 'aljon', 'el@gmail.com', '$2y$10$m/8W/4Uako1d4uwa7I2RouFKgDl0eVVH.bDxBNbWdxSLj0vvNwar6', '2025-11-16 01:58:58'),
(13, 'admin123', 'rel@gmail.com', '$2y$10$Xc3I7M83J/0.VDZwfYBCtuoUBQafP1aAW28KnGqludSDljXUdp73.', '2025-11-16 02:00:56'),
(14, 'hthththt', 'rel2@gmail.com', '$2y$10$0gXjOIRgOHcJtptwYhhtiOSw7WYbO7zhTyHK8LHNsqhvKZvtuG7jy', '2025-11-16 02:10:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
