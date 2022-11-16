package com.iljungitjung.domain.schedule.dto.reservation;


import com.iljungitjung.domain.schedule.entity.Schedule;
import lombok.Getter;

import java.text.SimpleDateFormat;

@Getter
public class ReservationCancelViewDto {

    private final Long id;
    private final String categoryName;
    private final String startDate;
    private final String endDate;

    private final String reason;

    private final String imagePath;

    private final String nickname;
    private final String contents;
    private final String cancelFrom;

    public ReservationCancelViewDto(Schedule schedule){
        this.id=schedule.getId();
        this.categoryName=schedule.getCategoryName();
        this.startDate=schedule.getDateFormat(schedule.getStartDate());
        this.endDate= schedule.getDateFormat(schedule.getEndDate());
        this.reason=schedule.getReason();
        this.imagePath=schedule.getUserFrom().getImagePath();
        this.nickname=schedule.getUserFrom().getNickname();
        this.contents=schedule.getContents();
        this.cancelFrom=schedule.getCancelFrom();

    }
}
