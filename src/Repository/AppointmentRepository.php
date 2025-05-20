<?php

namespace App\Repository;

use App\DTO\AppointmentData;
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

    /**
     * @param Participant $participant
     * @param \DateTime $start
     * @param \DateTime $end
     * @param int|null $excludeAppointmentId
     * @return bool
     */
    public function hasOverlap(Participant $participant, \DateTime $start, \DateTime $end, ?int $excludeAppointmentId = null): bool
    {
        $qb = $this->createQueryBuilder('a')
            ->select('COUNT(a.id)')
            ->where('a.participant = :participant')
            ->andWhere('(:start BETWEEN a.startTime AND a.endTime OR :end BETWEEN a.startTime AND a.endTime OR a.startTime BETWEEN :start AND :end)')
            ->setParameter('participant', $participant)
            ->setParameter('start', $start)
            ->setParameter('end', $end);

        if ($excludeAppointmentId !== null) {
            $qb->andWhere('a.id != :excludeId')
                ->setParameter('excludeId', $excludeAppointmentId);
        }

        $count = $qb->getQuery()->getSingleScalarResult();

        return $count > 0;
    }

    /**
     * @param string $title
     * @param \DateTime $start
     * @param \DateTime $end
     * @param Participant $participant
     * @return Appointment
     */
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

    /**
     * @param Appointment $appointment
     * @param AppointmentData $data
     * @return Appointment
     */
    public function update(
        Appointment $appointment,
        string $title,
        \DateTime $start,
        \DateTime $end,
        Participant $participant
    ): Appointment
    {
        $em = $this->getEntityManager();

        $appointment->setTitle($title);
        $appointment->setStartTime($start);
        $appointment->setEndTime($end);
        $appointment->setParticipant($participant);

        $em->persist($appointment);
        $em->flush();

        return $appointment;
    }
}
