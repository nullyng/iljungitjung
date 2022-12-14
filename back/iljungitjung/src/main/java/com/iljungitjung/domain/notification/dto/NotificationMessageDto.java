package com.iljungitjung.domain.notification.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
public class NotificationMessageDto {
    @Pattern(regexp = "^[0-9]{10,11}$", message = "수신인 전화번호(to)는 10~11자리의 숫자만 입력가능합니다.")
    @NotBlank(message = "수신인 전화번호(to)는 비워둘 수 없습니다.")
    private String to;

    @NotBlank(message = "메시지(content)는 비워둘 수 없습니다.")
    @Size(min=1, max=80, message = "메시지(content) 길이는 1~80자 입니다.")
    private String content;

    @Builder
    public NotificationMessageDto(String to, String content) {
        this.to = to;
        this.content = content;
    }
}


