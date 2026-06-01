-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июн 02 2026 г., 00:27
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `movie`
--

-- --------------------------------------------------------

--
-- Структура таблицы `watch_list`
--

CREATE TABLE `watch_list` (
  `id` int(11) NOT NULL,
  `movie_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `poster_path` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 10),
  `notes` text DEFAULT NULL,
  `status` varchar(50) DEFAULT 'want_to_watch',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `watch_list`
--

INSERT INTO `watch_list` (`id`, `movie_id`, `title`, `poster_path`, `rating`, `notes`, `status`, `created_at`) VALUES
(4, '157336', 'Interstellar', 'https://image.tmdb.org/t/p/w500/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg', NULL, '', 'watched', '2026-06-01 22:22:51'),
(5, '1083381', 'Backrooms', 'https://image.tmdb.org/t/p/w500/rhGx6E3qRNMgj3i5su2oukNHwIQ.jpg', NULL, '', 'want_to_watch', '2026-06-01 22:23:11'),
(7, '671', 'Harry Potter and the Philosopher\'s Stone', 'https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg', NULL, '', 'want_to_watch', '2026-06-01 22:23:30'),
(8, '389', '12 Angry Men', 'https://image.tmdb.org/t/p/w500/zhG3vKWyDRaZYoaww1UVAi29T9h.jpg', NULL, '', 'watched', '2026-06-01 22:24:00');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `watch_list`
--
ALTER TABLE `watch_list`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `watch_list`
--
ALTER TABLE `watch_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
