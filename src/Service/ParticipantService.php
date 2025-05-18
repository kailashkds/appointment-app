<?php

namespace App\Service;

use App\Dto\ParticipantData;
use App\Entity\Participant;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class ParticipantService
{
    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly ValidatorInterface $validator
    ) {}

    public function create(ParticipantData $data): Participant
    {
        $errors = $this->validator->validate($data);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            throw new BadRequestHttpException(json_encode($errorMessages));
        }

        return $this->em->getRepository(Participant::class)->createAndSave($data);
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
}
