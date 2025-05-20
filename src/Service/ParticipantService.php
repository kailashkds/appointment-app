<?php

namespace App\Service;

use App\Dto\ParticipantData;
use App\Entity\Participant;
use Doctrine\ORM\EntityManagerInterface;

class ParticipantService
{
    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly ValidatorService $validator
    ) {}

    public function create(ParticipantData $data): Participant
    {
        $this->validator->validate($data);

        $participant = new Participant();
        $participant->setName($data->name);
        $participant->setEmail($data->email);
        $this->validator->validate($participant);

        return $this->em->getRepository(Participant::class)->createAndSave($participant);
    }

    public function list(): array
    {
        $participants = $this->em->getRepository(Participant::class)->findAll();
        $data = [];

        foreach ($participants as $p) {
            $data[] = [
                'id' => $p->getId(),
                'name' => $p->getName(),
                'email' => $p->getEmail(),
            ];
        }

        return $data;
    }

    public function get(Participant $participant): array
    {
        return [
            'id' => $participant->getId(),
            'name' => $participant->getName(),
            'email' => $participant->getEmail(),
        ];
    }
}
