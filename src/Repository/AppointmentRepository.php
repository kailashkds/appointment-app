<?php

namespace App\Repository;

use App\Entity\Appointment;
use App\Entity\Participant;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Appointment>
 */
class AppointmentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Appointment::class);
    }

    public function hasOverlap(Participant $participant, \DateTime $start, \DateTime $end): bool
    {
        $qb = $this->createQueryBuilder('a')
            ->select('COUNT(a.id)')
            ->where('a.participant = :participant')
            ->andWhere('(:start BETWEEN a.startTime AND a.endTime OR :end BETWEEN a.startTime AND a.endTime OR a.startTime BETWEEN :start AND :end)')
            ->setParameter('participant', $participant)
            ->setParameter('start', $start)
            ->setParameter('end', $end);

        $count = $qb->getQuery()->getSingleScalarResult();

        return $count > 0;
    }


    public function createAndSave(string $title, \DateTime $start, \DateTime $end, Participant $participant): Appointment
    {
        $em = $this->getEntityManager();
        $appointment = new Appointment();
        $appointment->setTitle($title);
        $appointment->setStartTime($start);
        $appointment->setEndTime($end);
        $appointment->setParticipant($participant);

        $em->persist($appointment);
        $em->flush();

        return $appointment;
    }
}
