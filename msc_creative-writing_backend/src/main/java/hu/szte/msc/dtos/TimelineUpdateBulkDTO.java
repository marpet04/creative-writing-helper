package hu.szte.msc.dtos;

import java.util.List;

import hu.szte.msc.entities.StoryEvent;

public record TimelineUpdateBulkDTO(List<StoryEvent> events) {
    
}
