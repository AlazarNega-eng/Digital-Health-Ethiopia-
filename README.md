
---

## Installation and Deployment

You can run this project either locally for development or using Docker for a production-like setup.

### Prerequisites

*   Node.js (v18 or later)
*   npm
*   Docker and Docker Compose (for Docker deployment)

### 1. Local Development Setup

**Step 1: Clone the repository**
```bash
git clone https://github.com/your-username/fayda-health.git
cd fayda-health
```

**Step 2: Install dependencies**
```bash
npm install
```

**Step 3: Set up environment variables**
Edit the `.env` file with your database and authentication credentials.

**Step 4: Run database migrations**
```bash
npx prisma migrate dev
```

**Step 5: Start the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### 2. Docker Deployment

**Step 1: Build and start the containers**
```bash
docker-compose up --build
```

**Step 2: Apply Prisma migrations in the running container**
```bash
docker-compose exec app npx prisma migrate deploy
```

The app will be available at `http://localhost:3000` and PostgreSQL at `localhost:5432`.

---


# Project Title
FaydaHealth

# Contributors
*   [Alazar Nega]
*   [Brook Lemma]
*   [Natanim H/meskel]

---

# Project Synopsis

## Problem Statement
The current healthcare system in Ethiopia is largely dependent on a paper-based documentation process. When patients visit a hospital, their medical history is recorded on physical cards. This system presents several challenges:
*   **Inefficiency:** Patient registration and record retrieval are slow and labor-intensive.
*   **Risk of Data Loss:** Physical cards can be easily lost, damaged, or misplaced, leading to a complete loss of a patient's medical history.
*   **Lack of Centralization:** Medical records are fragmented across different healthcare providers, making it impossible to get a holistic view of a patient's health.
*   **Poor Patient Experience:** Patients are burdened with the responsibility of carrying their medical cards to every appointment.

## Planned Solution
FaydaHealth is a digital health platform designed to centralize and streamline patient health records using Ethiopia's national digital ID, Fayda. Our solution will replace the outdated paper-based system with a secure, unified digital platform. Key components include:
*   **Backend:** A robust server to manage the database and business logic.
*   **Database:** A secure and structured database to store patient information, medical history, and treatment plans.
*   **Frontend:** An intuitive user interface (UI) for healthcare professionals to access and manage patient records efficiently.
*   **Authentication:** Secure user authentication will be handled via the **VeriFayda OIDC** integration, using the Fayda ID as the single, reliable key to access a patient's record.

## Expected Outcome
By implementing FaydaHealth, we aim to achieve the following:
*   **Improved Efficiency:** Drastically reduce patient wait times and administrative overhead.
*   **Enhanced Patient Care:** Provide doctors with instant access to comprehensive and accurate patient history, leading to better-informed medical decisions and reduced errors.
*   **Empowered Patients:** Allow citizens to have a unified health record accessible with their Fayda ID, eliminating the need for physical cards.
*   **A Centralized Health Data System:** Create a foundational platform for a national electronic health record system, enabling better public health monitoring and policy-making.

## Fayda's Role
The Fayda ID is the cornerstone of our project. It serves as the **single source of truth for patient identity**.
*   **Unique Identifier:** Fayda provides a unique, secure, and verifiable digital identity for every citizen, eliminating duplicate records and identification errors.
*   **Seamless Integration:** By using the **VeriFayda OIDC API**, we can ensure that only authorized healthcare personnel can access sensitive medical data, securely authenticating their sessions.
*   **Foundation for Trust:** Leveraging the national ID infrastructure builds immediate trust and provides a scalable foundation to expand the system nationwide.

---

# Tech Stack
*   **Framework:** Next.js (with TypeScript)
*   **Database:** PostgreSQL
*   **ORM:** Prisma
*   **style:** Tailwind CSS and Shadcn/UI
*   **Authentication:** VeriFayda OIDC
*   **UI/UX Design:** [Figma]
*   **Deployment:** [Vercel, Docker]
