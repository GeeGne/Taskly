"use client"

// HOOKS
import { useEffect } from 'react';

// COMPONENTS
import MainWrapper from '@/components/MainWrapper';
import Header from '@/components/Header';

// STORES
import { useCurrentTabStore} from '@/store/index.js';

export default function About() {
  
  const { setCurrentTab } = useCurrentTabStore();
  useEffect(() => setCurrentTab('about'), []);

  return (
    <MainWrapper>
      <Header tab="About" />
      <div className="p-4">
        <h1
          id="second-headin-taskly-your-ultimate-task-management-solution-"
          className="text-md font-bold text-heading"
        >
          🌟 Taskly – Your Ultimate Task Management Solution 📝✨
        </h1>
        <p
          className="text-sm text-body"
        >
          Taskly is the productivity app designed to help you organize,
          prioritize, and accomplish your daily tasks effortlessly. Whether
          you&#39;re managing work projects, personal to-dos, or planning events,
          Taskly has you covered with an intuitive interface and powerful
          features. 🚀
        </p><br/>
        <h2 id="-key-features-" className="text-heading text-md font-bold">
          🌟 Key Features:
        </h2>
        <ul>
          <li
            className="text-sm text-body"
          >
            <strong>Effortless Task Management</strong>: Create, edit, and
            organize your tasks in seconds! 📋
          </li>
          <li
            className="text-sm text-body"
          >
            <strong>Custom Categories</strong>: Group tasks by projects or
            personal categories for seamless organization. 🗂️
          </li>
          <li
            className="text-sm text-body"
          >
            <strong>Prioritization</strong>: Mark important tasks with priority
            levels to stay focused on what matters most. 🔥
          </li>
          <li
            className="text-sm text-body"
          >
            <strong>Reminders &amp; Notifications</strong>: Never miss a deadline
            with timely alerts and reminders. ⏰
          </li>
          <li
            className="text-sm text-body"
          >
            <strong>Collaborative Workflows</strong>: Share tasks and collaborate
            with teammates or family members with ease. 🤝
          </li>
          <li
            className="text-sm text-body"
          >
            <strong>Progress Tracking</strong>: Keep an eye on your productivity
            with insightful analytics and reports. 📊
          </li>
        </ul><br/>
        <h2 id="-why-choose-taskly-"
          className="text-heading text-md font-bold"
        >🚀 Why Choose Taskly?</h2>
        <p
          className="text-sm text-body"
        >
          Taskly is designed for simplicity and functionality. Whether you&#39;re
          a busy professional, student, or team lead, Taskly helps you stay
          organized and productive with minimal effort. ✨
        </p>
        <hr /><br/>
        <h3 id="-get-started-today-"
          className="text-md text-heading"
        >
          💻 <strong>Get Started Today</strong>
        </h3>
        <p
          className="text-sm text-body"
        >
          Contribute to the code or report issues on{" "}
          <a href="https://github.com/your-username/taskly">GitHub</a>. Let&#39;s
          build a more productive future together! 🙌
        </p>
        <hr /><br/>
        <p
          className="text-sm text-body"
        >
          <strong>Built with love by Ahmed El Grahbra and contributors</strong>{" "}
          ❤️🛠️
        </p>
        <hr />
        <p
          className="text-sm text-body"
        >
          Hope you enjoy using Taskly as much as we loved building it! 🌈</p>
        <p
          className="text-sm text-body"
        >The end ...</p>
      </div>
    </MainWrapper>
  );
}
