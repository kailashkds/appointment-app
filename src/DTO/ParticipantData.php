<?php

// src/Dto/ParticipantData.php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class ParticipantData
{
    #[Assert\NotBlank]
    #[Assert\Length(min: 2)]
    public string $name;

    #[Assert\NotBlank]
    #[Assert\Email]
    public string $email;

    public function __construct(array $data)
    {
        $this->name = $data['name'] ?? '';
        $this->email = $data['email'] ?? '';
    }
}
