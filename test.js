// 1. إنشاء Class Student
class Student {
    constructor(id, name, grades, attendance) {
        this.id = id;
        this.name = name;
        this.grades = grades;
        this.attendance = attendance;
    }

    // 2. حساب المتوسط باستخدام reduce
    calculateAverage() {
        const total = this.grades.reduce((sum, grade) => sum + grade, 0);
        return total / this.grades.length;
    }

    // 3. تحديد التقدير
    getGrade() {
        const average = this.calculateAverage();

        if (average >= 90) {
            return "A";
        } else if (average >= 80) {
            return "B";
        } else if (average >= 70) {
            return "C";
        } else if (average >= 60) {
            return "D";
        } else if (average >= 50) {
            return "E";
        } else {
            return "F";
        }
    }

    // 4. تحديد النتيجة النهائية
    getResult() {
        const average = this.calculateAverage();

        if (average >= 50 && this.attendance >= 75) {
            return "ناجح";
        } else {
            return "يحتاج مراجعة";
        }
    }
}

// 5. إنشاء مصفوفة الطلاب
const studentsList = [
    new Student(101, "Ahmed", [90, 85, 95], 90),
    new Student(102, "Sara", [45, 40, 50], 80),
    new Student(103, "Omar", [70, 75, 65], 85),
    new Student(104, "Mona", [42, 48, 45], 90)
];

// 6. استخراج الطلاب المتعثرين
const strugglingStudents = studentsList.filter(student => {
    const average = student.calculateAverage();
    return average >= 40 && average <= 49;
});

// 7. إضافة درجات الرأفة
const mercyStudents = strugglingStudents.map(student => {
    const oldAverage = student.calculateAverage();

    return {
        name: student.name,
        oldAverage: oldAverage,
        newAverage: oldAverage + 5
    };
});

// 8. جمع المتوسطات الجديدة
const totalNewAverages = mercyStudents.reduce((sum, student) => {
    return sum + student.newAverage;
}, 0);

// 9. حساب متوسط الرأفة
const mercyAverage = { value: 0 };

if (mercyStudents.length > 0) {
    mercyAverage.value = totalNewAverages / mercyStudents.length;
}

// 10. عرض تقرير الطلاب داخل الصفحة
const studentsTable = document.getElementById("studentsTable");

studentsList.forEach(student => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.calculateAverage()}</td>
        <td>${student.getGrade()}</td>
        <td class="${student.getResult() === "ناجح" ? "success" : "failed"}">
            ${student.getResult()}
        </td>
    `;

    studentsTable.appendChild(row);
});

// 11. عرض طلاب الرأفة
const mercyTable = document.getElementById("mercyTable");

mercyStudents.forEach(student => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.oldAverage}</td>
        <td>${student.newAverage}</td>
    `;

    mercyTable.appendChild(row);
});

// 12. عرض متوسط الرأفة
document.getElementById("mercyAverage").textContent =
    "Mercy Average: " + mercyAverage.value;