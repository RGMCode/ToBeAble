package de.neuefische.backend.activity;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Data
@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class ActivityController {

    private ActivityService activityService;

    @GetMapping
    public List<Activity> getAllActivities(){
        return activityService.getAllActivities();
    }

    @PostMapping
    public Activity addActivity(@RequestBody Activity activity){
        return activityService.addActivity(activity);
    }


}
