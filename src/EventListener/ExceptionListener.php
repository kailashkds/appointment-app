<?php

// src/EventListener/ExceptionListener.php

namespace App\EventListener;

use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

class ExceptionListener
{
    #[AsEventListener(event: 'kernel.exception')]
    public function onKernelException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();

        $statusCode = $exception instanceof HttpExceptionInterface
            ? $exception->getStatusCode()
            : JsonResponse::HTTP_INTERNAL_SERVER_ERROR;

        // If the message is valid JSON, decode it — otherwise send as plain string
        $message = $exception->getMessage();
        $decoded = json_decode($message, true);
        $response = new JsonResponse(
            ['error' => $decoded ?? $message],
            $statusCode
        );

        $event->setResponse($response);
    }
}
