<?php

namespace App\Controller;

use App\DTO\AppointmentData;
use App\Service\AppointmentService;
use App\Service\ValidatorService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api')]
class AppointmentController extends AbstractController
{
    #[Route('/appointments', name: 'create_appointment', methods: ['POST'])]
    public function create(Request $request, AppointmentService $service, ValidatorService $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $dto = new AppointmentData($data);

        $appointment = $service->create($dto);

        return $this->json([
            'message' => 'Appointment created',
            'id' => $appointment->getId()
        ]);
    }

    #[Route('/appointments', name: 'list_appointments', methods: ['GET'])]
    public function list(AppointmentService $service): JsonResponse
    {
        $data = $service->listAll();
        return $this->json($data);
    }
}
