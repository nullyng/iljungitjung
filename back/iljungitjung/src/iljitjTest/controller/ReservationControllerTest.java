import com.iljungitjung.domain.category.dto.CategoryCreateRequestDto;
import com.iljungitjung.domain.schedule.dto.reservation.ReservationBlockRequestDto;
import com.iljungitjung.domain.schedule.dto.reservation.ReservationManageRequestDto;
import com.iljungitjung.domain.schedule.dto.reservation.ReservationRequestDto;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ReservationControllerTest extends AbstractControllerTest{


    @Test
    @Order(1)
    public void 카테고리_등록() throws Exception {

        String content = objectMapper.writeValueAsString(new CategoryCreateRequestDto(
                "커트", "0130", "#000000"));

        //given
        ResultActions actions = mockMvc.perform(post("/categories")
                .content(content)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        //then
        actions.andDo(print())
                .andExpect(status().isOk());
        categoryId++;
    }
    @Test
    @Order(2)
    public void 일정_요청() throws Exception {

        String content = objectMapper.writeValueAsString(new ReservationRequestDto(
                "1", "2", "20221017", "1500", "안녕하세요", "01011111111", "커트"));
        //given
        ResultActions actions = mockMvc.perform(post("/reservations")
                .content(content)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        //then
        actions.andDo(print())
                .andExpect(status().isOk());
        scheduleId++;
    }

    @Test
    @Order(3)
    public void 일정_수락() throws Exception {

        String content = objectMapper.writeValueAsString(new ReservationManageRequestDto(true, "가능합니다. 잘 부탁드려요."));


        //given
        ResultActions actions = mockMvc.perform(put("/reservations/" + scheduleId)
                .content(content)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        //then
        actions.andDo(print())
                .andExpect(status().isOk());
    }


    @Test
    @Order(4)
    public void 일정_삭제() throws Exception {

        String content = objectMapper.writeValueAsString(new ReservationManageRequestDto(false, "시간이 없어요"));


        //given
        ResultActions actions = mockMvc.perform(put("/reservations/" + scheduleId)
                .content(content)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        //then
        actions.andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @Order(5)
    public void 일정_차단_요청() throws Exception {

        String content = objectMapper.writeValueAsString(new ReservationBlockRequestDto(
                "1", "공휴일", "공휴일이라서 쉽니다.", "20221017", "1500", "1630"));
        //given
        ResultActions actions = mockMvc.perform(post("/reservations/block")
                .content(content)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        //then
        actions.andDo(print())
                .andExpect(status().isOk());
        scheduleId++;
    }

    @Test
    @Order(6)
    public void 카테고리_삭제() throws Exception {

        //given
        ResultActions actions = mockMvc.perform(delete("/categories/"+categoryId)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        //then
        actions.andDo(print())
                .andExpect(status().isOk());
    }

}