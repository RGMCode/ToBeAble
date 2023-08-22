package de.neuefische.backend.activity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

@Data
@With
@AllArgsConstructor
@NoArgsConstructor
public class Activity {
    private String id;
    private String activityName;
    private boolean possibleWhenWarm;
    private boolean possibleWhenMiddle;
    private boolean possibleWhenCold;
    private boolean possibleWhenRaining;
    private boolean possibleWithChildren;
    private boolean insideActivity;
    private boolean outsideActivity;
}
