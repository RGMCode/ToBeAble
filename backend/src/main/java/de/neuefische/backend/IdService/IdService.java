package de.neuefische.backend.IdService;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IdService {

    public String generateId() {
        return UUID.randomUUID().toString();
    }
}
