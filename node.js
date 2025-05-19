// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const coursesData = [
    { id: 1, category: "DJing", title: "Beginner DJ Course", description: "Learn the basics of DJing.", link: "/course/1" },
    { id: 2, category: "Songwriting", title: "Introduction to Songwriting", description: "Write your first song.", link: "/course/2" },
    { id: 3, category: "Production", title: "Music Production Fundamentals", description: "Master the basics of music production.", link: "/course/3" },
    { id: 4, category: "Management", title: "Event Management Essentials", description: "Plan successful events.", link: "/course/4" },
    { id: 5, category: "Equipment", title: "DJ Equipment Basics", description: "Understanding essential DJ gear.", link: "/course/5" },
    { id: 6, category: "DJing", title: "Advanced DJ Techniques", description: "Take your DJ skills to the next level.", link: "/course/6" },
    { id: 7, category: "Songwriting", title: "Lyric Writing Workshop", description: "Craft compelling lyrics.", link: "/course/7" },
    { id: 8, category: "Production", title: "Mixing and Mastering", description: "Learn the art of professional audio finishing.", link: "/course/8" },
    { id: 9, category: "Management", title: "Marketing Music Events", description: "Strategies to promote your events effectively.", link: "/course/9" },
    { id: 10, category: "Equipment", title: "Sound System Setup", description: "Setting up and managing sound equipment.", link: "/course/10" },
];

const usersData = {
    "testuser": { password: "testpassword", enrolled_courses: [1, 3], wishlist: [2, 5] },
    "anotheruser": { password: "securepass", enrolled_courses: [4], wishlist: [1] }
};

app.get('/api/courses', (req, res) => {
    const { category, search } = req.query;
    let filteredCourses = coursesData;

    if (category && category !== 'All') {
        filteredCourses = filteredCourses.filter(course => course.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
        const searchTerm = search.toLowerCase();
        filteredCourses = filteredCourses.filter(course =>
            course.title.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm) ||
            course.category.toLowerCase().includes(searchTerm)
        );
    }

    res.json(filteredCourses);
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (usersData[username] && usersData[username].password === password) {
        res.json({ message: 'Login successful', user: username });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.get('/api/user/:username/enrolled', (req, res) => {
    const { username } = req.params;

    if (usersData[username]) {
        const enrolledCourseIds = usersData[username].enrolled_courses;
        const enrolledCourses = coursesData.filter(course => enrolledCourseIds.includes(course.id));
        res.json(enrolledCourses);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.get('/api/user/:username/wishlist', (req, res) => {
    const { username } = req.params;

    if (usersData[username]) {
        const wishlistCourseIds = usersData[username].wishlist;
        const wishlistCourses = coursesData.filter(course => wishlistCourseIds.includes(course.id));
        res.json(wishlistCourses);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.post('/api/user/:username/wishlist/add/:courseId', (req, res) => {
    const { username, courseId } = req.params;
    const courseIdInt = parseInt(courseId);

    if (usersData[username]) {
        if (!usersData[username].wishlist.includes(courseIdInt)) {
            usersData[username].wishlist.push(courseIdInt);
            res.json({ message: 'Course added to wishlist' });
        } else {
            res.json({ message: 'Course already in wishlist' });
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.delete('/api/user/:username/wishlist/remove/:courseId', (req, res) => {
    const { username, courseId } = req.params;
    const courseIdInt = parseInt(courseId);

    if (usersData[username]) {
        const index = usersData[username].wishlist.indexOf(courseIdInt);
        if (index > -1) {
            usersData[username].wishlist.splice(index, 1);
            res.json({ message: 'Course removed from wishlist' });
        } else {
            res.json({ message: 'Course not in wishlist' });
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(Server listening at http://localhost:${port});
});