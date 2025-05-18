<?php

namespace App\Controller;

use App\DTO\ParticipantData;
use App\Service\ParticipantService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api')]
class ParticipantController extends AbstractController
{
    #[Route('/participants', name: 'create_participant', methods: ['POST'])]
    public function create(Request $request, ValidatorInterface $validator, ParticipantService $service): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $dto = new ParticipantData($data);
        $participant = $service->create($dto);

        return $this->json([
            'message' => 'Participant created',
            'id' => $participant->getId()
        ]);
    }

    #[Route('/participants', name: 'list_participants', methods: ['GET'])]
    public function list(ParticipantService $participantService): JsonResponse
    {
        return $this->json($participantService->list());
    }
}
