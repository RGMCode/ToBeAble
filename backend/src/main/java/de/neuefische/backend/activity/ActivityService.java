package de.neuefische.backend.activity;

import de.neuefische.backend.IdService.IdService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Data
@Service
@AllArgsConstructor
public class ActivityService {

    private ActivityRepository activityRepository;
    private IdService idService;

    public Activity addActivity(Activity activity) {
        return activityRepository.save(activity.withId(idService.generateId()));
    }

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }
}
