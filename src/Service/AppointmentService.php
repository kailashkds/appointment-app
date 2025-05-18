<?php

// src/Service/AppointmentService.php

namespace App\Service;

use App\Entity\Appointment;
use App\Entity\Participant;
use App\DTO\AppointmentData;
use App\Repository\AppointmentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class AppointmentService
{
    public function __construct(
        private EntityManagerInterface $em,
        private readonly ValidatorInterface $validator
    ) {}

    public function create(AppointmentData $data): Appointment
    {
        $errors = $this->validator->validate($data);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            throw new BadRequestHttpException(json_encode($errorMessages));
        }

        $participant = $this->em->getRepository(Participant::class)->find($data->participant_id);
        if (!$participant) {
            throw new NotFoundHttpException('Participant not found');
        }

        $start = new \DateTime($data->start_time);
        $end = new \DateTime($data->end_time);


        /** @var AppointmentRepository $repo */
        $repo = $this->em->getRepository(Appointment::class);
        if ($repo->hasOverlap($participant, $start, $end)) {
            throw new BadRequestHttpException(json_encode(['error' => 'Appointment overlaps with an existing one']));
        }

        return $repo->createAndSave($data->title, $start, $end, $participant);
    }

    public function listAll(): array
    {
        $appointments = $this->em->getRepository(Appointment::class)->findAll();
        $data = [];

        foreach ($appointments as $a) {
            $data[] = [
                'id' => $a->getId(),
                'title' => $a->getTitle(),
                'start_time' => $a->getStartTime()->format('Y-m-d H:i:s'),
                'end_time' => $a->getEndTime()->format('Y-m-d H:i:s'),
                'participant' => [
                    'id' => $a->getParticipant()->getId(),
                    'name' => $a->getParticipant()->getName(),
                ],
            ];
        }

        return $data;
    }
}
