-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone` BIGINT NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `user_type` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Player` (
    `userid` INTEGER NOT NULL,
    `fideid` INTEGER NOT NULL,
    `fide_rating` INTEGER NOT NULL,
    `birthdate` DATE NOT NULL,
    `sex` VARCHAR(191) NOT NULL,
    `federation` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tournament` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `date_start` DATETIME(3) NOT NULL,
    `date_end` DATETIME(3) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `admin_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pairing_and_Result` (
    `white_player_id` INTEGER NOT NULL,
    `black_player_id` INTEGER NOT NULL,
    `round_no` INTEGER NOT NULL,
    `winner` VARCHAR(191) NOT NULL,
    `tournament_id` INTEGER NOT NULL,

    PRIMARY KEY (`white_player_id`, `round_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Players_Tournaments` (
    `player_id` INTEGER NOT NULL,
    `tournament_id` INTEGER NOT NULL,
    `tournament_player_id` INTEGER NOT NULL,

    PRIMARY KEY (`player_id`, `tournament_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Round` (
    `round_no` INTEGER NOT NULL,
    `datetime` DATETIME(3) NOT NULL,
    `tournament_id` INTEGER NOT NULL,

    PRIMARY KEY (`tournament_id`, `round_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tournament` ADD CONSTRAINT `Tournament_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pairing_and_Result` ADD CONSTRAINT `Pairing_and_Result_tournament_id_round_no_fkey` FOREIGN KEY (`tournament_id`, `round_no`) REFERENCES `Round`(`tournament_id`, `round_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Players_Tournaments` ADD CONSTRAINT `Players_Tournaments_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `Player`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Players_Tournaments` ADD CONSTRAINT `Players_Tournaments_tournament_id_fkey` FOREIGN KEY (`tournament_id`) REFERENCES `Tournament`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Round` ADD CONSTRAINT `Round_tournament_id_fkey` FOREIGN KEY (`tournament_id`) REFERENCES `Tournament`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
