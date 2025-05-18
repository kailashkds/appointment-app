<?php

// src/DTO/AppointmentData.php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class AppointmentData
{
    #[Assert\NotBlank]
    public string $title;

    #[Assert\NotBlank]
    #[Assert\DateTime]
    public string $start_time;

    #[Assert\NotBlank]
    #[Assert\DateTime]
    public string $end_time;

    #[Assert\NotBlank]
    #[Assert\Type("numeric")]
    public int $participant_id;


    public function __construct(array $data)
    {
        $this->title = $data['title'] ?? '';
        $this->start_time = $data['start_time'] ?? '';
        $this->end_time = $data['end_time'] ?? '';
        $this->participant_id = (int) ($data['participant_id'] ?? 0);
    }
}
