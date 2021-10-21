window.onload = (event) =>{
    $("nav").html(`<a href="index.html"><header class="text-light">VTU CALC</header></a>
    <div class="d-flex">
        <a href="../../about-me.html"><span class="mx-2 small text-warning">About me</span></a>
        <a href="https://github.com/Sananthu-47/VTU_CALCULATOR" target="_blank"><span class="mx-2 small text-info">Github</span></a>
    </div>
    `);

    $("#calculate-sgpa").on('click',calculateSGPA);
    $("#reset-sgpa").on('click',resetSGPA);
    $("#calculate-cgpa").on('click',calculateCGPA);
    $("#reset-cgpa").on('click',resetCGPA);
    $("#calculate-percentage").on('click',function(){
        let sgpa = $(".marks").val(); 
        let per = calculatePercentage(sgpa);
        $("#percentage").val(per);

    });
    const totalCredits = {2017 : [24,24,28,28,26,26,24,20],
                          2018 : [20,20,24,24,25,24,20,18]};

    function calculateSGPA() {
        let sem = $(this).val();
        let branch = $(this).data('branch');
        let scheme = $(this).data('scheme');
        const credits = {2017 : {
                "CSE" : [[4,4,4,4,4,2,2],[4,4,4,4,4,2,2],[4,4,4,4,3,4,2,2,1],[4,3,4,4,4,4,2,2,1],[4,4,4,4,3,3,2,2],[4,4,4,4,3,3,2,2],[4,4,4,3,3,2,2,2],[4,4,3,2,6,1]],
                "ISE" : [[4,4,4,4,4,2,2],[4,4,4,4,4,2,2],[4,4,4,4,3,4,2,2,1],[4,3,4,4,4,4,2,2,1],[4,4,4,4,3,3,2,2],[4,4,4,4,3,3,2,2],[4,4,4,3,3,2,2,2],[4,4,3,2,6,1]],
                "ECE" : [[4,4,4,4,4,2,2],[4,4,4,4,4,2,2],[4,3,4,4,4,4,2,2,1],[4,4,4,4,4,3,2,2,1],[4,4,4,4,3,3,2,2],[4,4,4,4,3,3,2,2],[4,4,4,3,3,2,2,2],[4,4,3,2,6,1]],
                "EEE" : [[4,4,4,4,4,2,2],[4,4,4,4,4,2,2],[4,4,4,4,4,3,2,2,1],[4,4,4,4,4,3,2,2,1],[4,4,4,4,3,3,2,2],[4,4,4,4,3,3,2,2],[4,4,4,3,3,2,2,2],[4,4,3,2,6,1]],
                "CE" : [[4,4,4,4,4,2,2],[4,4,4,4,4,2,2],[4,4,4,4,3,4,2,2,1],[4,3,4,4,4,4,2,2,1],[4,4,4,4,3,3,2,2],[4,4,4,4,3,3,2,2],[4,4,4,3,3,2,2,2],[4,4,3,2,6,1]],
                "ME" : [[4,4,4,4,4,2,2],[4,4,4,4,4,2,2],[4,4,4,4,4,3,2,2,1],[4,4,4,4,4,3,2,2,1],[4,4,4,4,3,3,2,2],[4,4,4,4,3,3,2,2],[4,4,4,3,3,2,2,2],[4,4,3,2,6,1]]
            },2018 : { "ALL" : [[4,4,3,3,3,1,1,1],[4,4,3,3,3,1,1,1],[3,4,3,3,3,3,2,2,1],[3,4,3,3,3,3,2,2,1],[3,4,4,3,3,3,2,2,1],[4,4,4,3,3,2,2,2],[3,3,3,3,3,2,2,1],[3,3,8,1,3]]}
        };

        let scored = 0;
        document.querySelectorAll('.marks').forEach((ele,i)=>{
            let converted = convertToCredits(ele.value,ele);
            scored+=(credits[scheme][branch][sem-1][i] * converted);
        });
        let sgpa = parseFloat((scored/totalCredits[scheme][sem-1]).toFixed(2));
        $("#sgpa").val(sgpa);
        $("#percentage").val(calculatePercentage(sgpa)+"%");
    }

    function calculateCGPA() {
        let scored = 0;
        let cgpaCount = 0;
        let flag = true;
        let scheme = $(this).data('scheme');

        document.querySelectorAll('.marks').forEach((ele,i)=>{
            if(ele.value > 0 && ele.value <= 10){
                scored+=(totalCredits[scheme][i] * ele.value);
                cgpaCount+=totalCredits[scheme][i];
                ele.style.border = '2px solid rgb(220 220 220)';
            }else if(ele.value < 0 || ele.value > 10){
                ele.style.border = "2px solid red";
                flag = false;
            }
        });
        if(flag){
            let cgpa = parseFloat((scored/cgpaCount).toFixed(2));
            if(scored == 0){
                cgpa = 0;
            }
            $("#cgpa").val(cgpa);
            $("#percentage").val(calculatePercentage(cgpa)+"%");
            document.querySelectorAll('.marks').forEach(ele=>{
                ele.style.border = '2px solid rgb(220 220 220)';
            });
        }else{
            $("#cgpa").val('');
            $("#percentage").val('');
        }
    }

    function calculatePercentage(sgpa){
        if(sgpa == 0){
            return 0;
        }
        return parseFloat(((sgpa - 0.75)*10).toFixed(2));
    }

    function convertToCredits(mark,ele) {
        let converted = 0;
        if(mark > 100 || mark < 0){
            ele.style.border = '2px solid red';
            return 0;
        }
        switch (true) {
            case (mark>=90 && mark<=100):
                converted = 10;
                break;
            case (mark<90 && mark>=80):
                converted = 9;
                break;
            case (mark<80 && mark>=70):
                converted = 8;
                break;
            case (mark<70 && mark>=60):
                converted = 7;
                break;
            case (mark<60 && mark>=45):
                converted = 6;
                break;
            case (mark<45 && mark>=40):
                converted = 4;
                break;
            case (mark<40 && mark>=0):
                converted = 0;
                break;
            default:
                break;
        }
        ele.style.border = '2px solid rgb(220 220 220)';
        return converted;
    }

    function resetSGPA() {
        document.querySelectorAll('.marks').forEach(ele=>{
            ele.value = 0;
            ele.style.border = '2px solid rgb(220 220 220)';
        });
        $("#sgpa").val('');
        $("#percentage").val('');
    }

    function resetCGPA() {
        document.querySelectorAll('.marks').forEach(ele=>{
            ele.value = 0;
            ele.style.border = '2px solid rgb(220 220 220)';
        });
        $("#cgpa").val('');
        $("#percentage").val('');
    }
    
};