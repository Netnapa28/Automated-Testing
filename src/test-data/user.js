//login ได้
const validUsers = [
    {
        username: "standard_user",
        password: "secret_sauce"
    },
    {
        username: "performance_glitch_user",
        password: "secret_sauce"
    },
    {
        username: "visual_user",
        password: "secret_sauce"
    }
];

//login ได้, เเต่มีปัญหาข้างในตอนใช้
const problemUsers = [
    {
        username: "problem_user",
        password: "secret_sauce"
    },
    {
        username: "visual_user",
        password: "secret_sauce"
    }
];

//login ไม่ได้
const invalidUsers = [
    {
        username: "locked_out_user",
        password: "secret_sauce"
    },
    {
        username: "testt_user",
        password: "secret_sauce"
    }
];

module.exports = {
    validUsers,
    problemUsers,
    invalidUsers
}