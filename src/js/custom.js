/* select 제어 스크립트 시작 
    option 에 id 는 필수값입니다.
*/
/* class명을 추가/제거 해주는 함수 */
function toggleSelectBox(selectBox) {
    selectBox.classList.toggle("active");
}

/* 옵션값 선택 */
function selectOption(optionElement) {
    const selectBox = optionElement.closest(".select");
    const val = optionElement.closest(".option").id;
    const selectedElement = selectBox.querySelector(".selected_value");
    selectedElement.textContent = optionElement.textContent;
    const chNodes = selectBox.querySelectorAll('li');
    for(var i=0; i<chNodes.length; i++){
        if(chNodes[i].classList.length == 2){
            chNodes[i].className = 'option';
        }
    }
    document.getElementById(val).className = 'option checked';
}

const selectBoxElements = document.querySelectorAll(".select");

selectBoxElements.forEach(selectBoxElement => {
    selectBoxElement.addEventListener("click", function (e) {
        const targetElement = e.target;
        console.log(targetElement);
        const isOptionElement = targetElement.classList.contains("option");

        if (isOptionElement) {
            selectOption(targetElement);
        }

        toggleSelectBox(selectBoxElement);
    });
});

document.addEventListener("click", function (e) {
    const targetElement = e.target;
    const isSelect = targetElement.classList.contains("select") || targetElement.closest(".select");

    if (isSelect) {
        return;
    }

    const allSelectBoxElements = document.querySelectorAll(".select");

    allSelectBoxElements.forEach(boxElement => {
        boxElement.classList.remove("active");
    });
});
/* select 제어 스크립트 끝 */

/* 유효성 검사 */
$(".validate_chk").on('propertychange change keyup paste input', function(){
    const numRegex = /^[0-9]*$/;
    if($(this).val() == ""){
        $(this).removeClass('ok');
        $(this).parent().removeClass('ok');
        $(this).next().removeClass('ok');
        $(this).removeClass('wrong');
        $(this).parent().removeClass('wrong');
        $(this).next().removeClass('wrong');
        $(this).next().text('');
    }
    if ($(this).val() != "" && numRegex.test($(this).val())) { // 해당 #text 값이 정규식과 일치할 경우
		$(this).removeClass('wrong');
        $(this).parent().removeClass('wrong');
        $(this).next().removeClass('wrong');
        $(this).addClass('ok');
        $(this).parent().addClass('ok');
        $(this).next().addClass('ok');
        $(this).next().text('입력이 정상적으로 완료되었습니다.');
	} else { // 일치하지 않을 경우
		$(this).removeClass('ok');
        $(this).parent().removeClass('ok');
        $(this).next().removeClass('ok');
        $(this).addClass('wrong');
        $(this).parent().addClass('wrong');
        $(this).next().addClass('wrong');
        $(this).next().text('입력 형식이 올바르지 않습니다. 다시 확인해주세요.');
	}
});

/* badge checkbox */
$(".badge").css('opacity', '0');
$("input:checkbox[name='exer_purpose']").click(function() {
    var checkedCount = $("input:checkbox[name='exer_purpose']:checked").length;
    if ($(this).is(":checked")) {
        $(this).siblings('.badge').css('opacity', '1');
        if($(this).siblings('.badge').text() == ''){
            $(this).siblings('.badge').text(checkedCount);
        }
    } else {
        $(this).siblings(".badge").css('opacity', '0');
    }
});
