
import { Faculty, Course, News, Event, Department } from '../types';

// In-memory cache for our data to avoid re-fetching
const cache: { [key: string]: any } = {};

async function fetchAndCache<T>(key: string, url: string): Promise<T> {
    if (cache[key]) {
        return cache[key] as T;
    }
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} for ${url}`);
    }
    const data = await response.json();
    cache[key] = data;
    return data as T;
}

const simulateNetworkDelay = (delay = 300) => new Promise(res => setTimeout(res, delay));

export const getFaculty = async (): Promise<Faculty[]> => {
    await simulateNetworkDelay();
    return fetchAndCache<Faculty[]>('faculty', './data/faculty.json');
};

export const getFacultyById = async (id: string): Promise<Faculty | undefined> => {
    // The delay from getFaculty is sufficient
    const allFaculty = await getFaculty();
    return allFaculty.find(f => f.id === id);
};

export const getCourses = async (): Promise<Course[]> => {
    await simulateNetworkDelay();
    return fetchAndCache<Course[]>('courses', './data/courses.json');
};

export const getCourseById = async (id: string): Promise<Course | undefined> => {
    const allCourses = await getCourses();
    return allCourses.find(c => c.id === id);
};

export const getNews = async (limit: number = 5): Promise<News[]> => {
    await simulateNetworkDelay();
    const allNews = await fetchAndCache<News[]>('news', './data/news.json');
    const sortedNews = [...allNews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return sortedNews.slice(0, limit);
};

export const getEvents = async (limit: number = 6): Promise<Event[]> => {
    await simulateNetworkDelay();
    const allEvents = await fetchAndCache<Event[]>('events', './data/events.json');
    const upcomingEvents = [...allEvents]
        .filter(e => new Date(e.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return upcomingEvents.slice(0, limit);
};

export const getDepartments = async (): Promise<Department[]> => {
    await simulateNetworkDelay();
    return fetchAndCache<Department[]>('departments', './data/departments.json');
}

export const submitApplication = async (formData: any): Promise<{ success: boolean; referenceNumber: string }> => {
    console.log("Submitting application:", formData);
    // In a real app, this would send data to a server.
    // Here, we just simulate a successful submission.
    await new Promise(res => setTimeout(res, 1000));
    const referenceNumber = `KBN-${Date.now()}`;
    console.log(`Application successful. Reference Number: ${referenceNumber}`);
    return { success: true, referenceNumber };
}
