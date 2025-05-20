<?php

namespace App\Repository;

use App\Dto\ParticipantData;
use App\Entity\Appointment;
use App\Entity\Participant;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Participant>
 */
class ParticipantRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Participant::class);
    }

    public function createAndSave(ParticipantData $data): Participant
    {
        $em = $this->getEntityManager();
        $participant = new Participant();
        $participant->setName($data->name);
        $participant->setEmail($data->email);

        $em->persist($participant);
        $em->flush();

        return $participant;
    }
}
