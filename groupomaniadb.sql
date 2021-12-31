-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 31 déc. 2021 à 21:29
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomaniadb`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `idUsers` int(11) NOT NULL,
  `idMessages` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `idUsers`, `idMessages`, `comment`, `createdAt`, `updatedAt`) VALUES
(1, 13, 1, 'premier commentaire', '2021-12-22 13:27:59', '2021-12-22 13:27:59'),
(3, 12, 1, 'bonjour commentaire', '2021-12-22 14:37:15', '2021-12-22 14:37:15'),
(5, 15, 5, 'bonsoir', '2021-12-22 15:10:31', '2021-12-22 15:10:31'),
(6, 13, 7, 'so hot', '2021-12-23 15:30:40', '2021-12-23 15:30:40'),
(10, 13, 9, 'Coucou happy !', '2021-12-24 14:57:02', '2021-12-24 14:57:02'),
(11, 13, 10, 'test commentaire long : Et interdum acciderat, ut siquid in penetrali secreto nullo citerioris vitae ministro praesente paterfamilias uxori susurrasset in aurem, velut Amphiarao referente aut Marcio, quondam vatibus inclitis, postridie disceret imperator.', '2021-12-24 15:02:49', '2021-12-24 15:02:49'),
(12, 17, 7, 'piiquante', '2021-12-27 15:55:11', '2021-12-27 15:55:11'),
(14, 13, 8, 'ne pas supprimer', '2021-12-29 09:14:20', '2021-12-29 09:14:20'),
(18, 13, 1, 'test', '2021-12-31 16:34:00', '2021-12-31 16:34:00'),
(19, 13, 1, 'test 2', '2021-12-31 16:45:28', '2021-12-31 16:45:28'),
(20, 13, 14, 'OU ON ACHETE PLZ ???', '2021-12-31 16:45:53', '2021-12-31 16:45:53');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `idUsers` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `like` int(11) DEFAULT NULL,
  `dislike` int(11) DEFAULT NULL,
  `usersLiked` varchar(255) DEFAULT NULL,
  `usersDisliked` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `idUsers`, `title`, `content`, `image`, `like`, `dislike`, `usersLiked`, `usersDisliked`, `createdAt`, `updatedAt`) VALUES
(1, 13, '1er message', '1er message test', NULL, NULL, NULL, NULL, NULL, '2021-12-22 11:20:21', '2021-12-22 11:20:21'),
(3, 13, '2eme message admin', 'test 2eme message admin', NULL, NULL, NULL, NULL, NULL, '2021-12-22 14:08:07', '2021-12-22 14:08:07'),
(4, 12, 'message non admin', 'bonsoir', NULL, NULL, NULL, NULL, NULL, '2021-12-22 14:30:04', '2021-12-22 14:30:04'),
(7, 13, 'test image', 'image', 'http://localhost:3000/images/TABASCO®_Habanero_Sauce.jpg1640193152707.jpg', NULL, NULL, NULL, NULL, '2021-12-22 17:12:32', '2021-12-22 17:12:32'),
(8, 12, 'test supp message', 'à supprimer', NULL, NULL, NULL, NULL, NULL, '2021-12-23 16:22:16', '2021-12-23 16:22:16'),
(9, 13, 'test fichier gif', 'ça marche !!!', 'http://localhost:3000/images/anime-happy.gif1640357706574.gif', NULL, NULL, NULL, NULL, '2021-12-24 14:55:06', '2021-12-24 14:55:06'),
(10, 13, 'test texte long', 'Et interdum acciderat, ut siquid in penetrali secreto nullo citerioris vitae ministro praesente paterfamilias uxori susurrasset in aurem, velut Amphiarao referente aut Marcio, quondam vatibus inclitis, postridie disceret imperator. ideoque etiam parietes ', NULL, NULL, NULL, NULL, NULL, '2021-12-24 15:02:19', '2021-12-24 15:02:19'),
(11, 17, 'Rerservia', 'Mon premier projet : Reservia, site de planification de vaccances', 'http://localhost:3000/images/reservia.png1640618667083.png', NULL, NULL, NULL, NULL, '2021-12-27 15:24:27', '2021-12-27 15:24:27'),
(12, 17, 'ohmyfood!', 'Mon second projet : ohmyfood! site de réservation de restaurants', 'http://localhost:3000/images/ohmyfood.png1640618831080.png', NULL, NULL, NULL, NULL, '2021-12-27 15:27:11', '2021-12-27 15:27:11'),
(13, 17, 'La Chouette Agence', 'Mon 3ème projet : Optimisation du SEO du site de la Chouette Agence, agence de WebDesign', 'http://localhost:3000/images/chouette.png1640618948949.png', NULL, NULL, NULL, NULL, '2021-12-27 15:29:08', '2021-12-27 15:29:08'),
(14, 17, 'Orinoco', 'Mon 5ème projet : Orinoco, site e-commerce vendant des ours en peluche fais à la main', 'http://localhost:3000/images/orinoco.png1640619077777.png', NULL, NULL, NULL, NULL, '2021-12-27 15:31:17', '2021-12-27 15:31:17'),
(15, 17, 'Piiquante', 'Mon 6ème projet : Hot Takes, application d\'avis gastronomique autour des sauces piquantes de Piiquante', 'http://localhost:3000/images/piquante.png1640619304462.png', NULL, NULL, NULL, NULL, '2021-12-27 15:35:04', '2021-12-27 15:35:04'),
(19, 13, 'New message test', 'A supprimer pour demo', NULL, NULL, NULL, NULL, NULL, '2021-12-31 16:00:47', '2021-12-31 16:00:47'),
(21, 12, '2022', 'Bonne année', NULL, NULL, NULL, NULL, NULL, '2021-12-31 16:52:30', '2021-12-31 16:52:30');

-- --------------------------------------------------------

--
-- Structure de la table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20211119141429-create-user.js'),
('20211119142329-create-message.js'),
('20211119143109-create-comment.js');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `firstname`, `lastname`, `password`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(12, 'test7@email.fr', 'Testeur7', 'Developement7', '$2b$10$uGQGla2YQzxa6C0QE1Gn0eRExE/nRFvVgsmySxxQemqvOX2lmbpx.', 0, '2021-12-10 14:16:12', '2021-12-22 14:32:39'),
(13, 'test1@email.fr', 'AdminCompte', 'Groupomania', '$2b$10$CCv0SuRt8hYoY8Nbx6CjCu0WXVp/KD5q2GU5Tnftvldss3jASsUqe', 1, '2021-12-10 14:40:47', '2021-12-31 20:09:04'),
(14, 'test2@email.fr', 'Testeur2', 'Developement2', '$2b$10$SFPgPvptqXWaS4AWyPpiS.MHo4HcJCdMkHJuCn1Id2EguaZsItTxu', 0, '2021-12-16 13:45:49', '2021-12-16 13:45:49'),
(16, 'test4@email.fr', 'Testeur4', 'Developement4', '$2b$10$E4kt2YuPw5KSz8/iZm7ZVuUkzX3rjyc2cZj3dhT.Gyc2wiuCU8R6y', 0, '2021-12-22 15:17:20', '2021-12-22 15:17:20'),
(17, 'test3@email.fr', 'Nicolas', 'Tuller', '$2b$10$o2M/2CmyXzs0GAPPjubu6OTqOON45JaFqzqybvc7waFq8ILexzaPe', 0, '2021-12-27 15:19:58', '2021-12-27 15:19:58'),
(18, 'test5@email.fr', 'Testeur5', 'Developement5', '$2b$10$dubria2q0RQ7EL2QYDcwAuzaJvnhw1KLWx3uVbiUJynxvOuJQ2gh.', 0, '2021-12-28 13:20:19', '2021-12-28 13:20:19'),
(19, 'erreur@email.fr', 'erreur', 'test', '$2b$10$vxsN22vpxORrlP65ACaO9eOA6GNWyQLpj04kcWounkajO.FNC4EeO', 0, '2021-12-29 11:54:16', '2021-12-29 11:54:16'),
(20, 'test6@email.fr', 'Testeur6', 'Developement6', '$2b$10$sqVEZoundjq24Qm3xmV4cOZoNGBZ2VkuHee67wA8uAkmnaM1knMlK', 0, '2021-12-31 16:56:22', '2021-12-31 16:56:22'),
(31, 'test8@email.fr', 'Testeur8', 'Developement8', '$2b$10$wfW3ThB/Bih4F/JCs79DUe8XrrtShKEmcrV8r3il7GKq2V.ojgL2C', 0, '2021-12-31 19:07:59', '2021-12-31 19:07:59');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
