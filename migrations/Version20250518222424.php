<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250518222424 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F844BEF137EE
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_FE38F844BEF137EE ON appointment
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE appointment CHANGE participant_id_id participant_id INT DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE appointment ADD CONSTRAINT FK_FE38F8449D1C3019 FOREIGN KEY (participant_id) REFERENCES participant (id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_FE38F8449D1C3019 ON appointment (participant_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            DROP TABLE user
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F8449D1C3019
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_FE38F8449D1C3019 ON appointment
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE appointment CHANGE participant_id participant_id_id INT DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE appointment ADD CONSTRAINT FK_FE38F844BEF137EE FOREIGN KEY (participant_id_id) REFERENCES participant (id) ON UPDATE NO ACTION ON DELETE NO ACTION
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_FE38F844BEF137EE ON appointment (participant_id_id)
        SQL);
    }
}
