<?php

namespace App\Controller\Api;

use App\DTO\AppointmentData;
use App\Entity\Appointment;
use App\Service\AppointmentService;
use App\Service\ValidatorService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

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

    #[Route('/appointments/{id}', name: 'get_appointments', methods: ['GET'])]
    public function get(Appointment $appointment, AppointmentService $service): JsonResponse
    {
        $data = $service->get($appointment);
        return $this->json($data);
    }

    #[Route('/appointments/{id}', name: 'delete_appointments', methods: ['DELETE'])]
    public function delete(Appointment $appointment, AppointmentService $service): JsonResponse
    {
        $data = $service->delete($appointment);
        return $this->json($data);
    }

    #[Route('/appointments/{id}', name: 'update_appointment', methods: ['PUT', 'PATCH'])]
    public function update(
        Appointment $appointment,
        Request $request,
        AppointmentService $service,
        ValidatorService $validator
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $dto = new AppointmentData($data);

        $appointment = $service->update($appointment, $dto);

        return $this->json([
            'message' => 'Appointment updated',
            'id' => $appointment->getId()
        ]);
    }
}
