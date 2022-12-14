package com.iljungitjung.domain.notification.controller;

import com.iljungitjung.domain.notification.dto.PhoneConfirmRequestDto;
import com.iljungitjung.domain.notification.service.PhoneService;
import com.iljungitjung.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Pattern;

@RequiredArgsConstructor
@RestController
@RequestMapping("/phones")
@Validated
public class PhoneController {
    private final PhoneService phoneService;

    @PostMapping("/{phonenum}")
    public ResponseEntity<CommonResponse> sendAuthenticatePhone (
            @Pattern(regexp = "^01\\d{8,9}$", message = "전화번호는 01로 시작하고 10~11자리의 숫자만 입력가능합니다.")
            @PathVariable("phonenum")
            String phonenum,
            HttpServletRequest request
    ) {
        String response = phoneService.requestRandomNumber(phonenum, request.getSession());
        if(response.length() == 6) {
            return new ResponseEntity<>(CommonResponse.getSuccessResponse(response), HttpStatus.OK);
        }
        return new ResponseEntity<>(CommonResponse.getErrorResponse(response), HttpStatus.CONFLICT);
    }

    @PutMapping
    public void confirmAuthenticatePhone (
            @Valid @RequestBody
            PhoneConfirmRequestDto requestDto,
            HttpServletRequest request
    ) {
        phoneService.confirmRandomNumber(requestDto, request.getSession());
    }
}
