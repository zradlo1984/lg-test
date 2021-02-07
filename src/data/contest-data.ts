import {
    Project1Lesson5,
    Project1Lesson5SubA,
    Project1Lesson5SubB,
    Project1Lesson5SubC, Project1Lesson5SubCulture,
    Project1Lesson5SubD, Project1Lesson5SubE, Project1Lesson5SubP
} from './anj/Project1/Lesson5';
import {
    AnjConjuctions,
    AnjDays,
    AnjPrepositions,
    AnjPronounsPersonal,
    AnjPronounsPossesive,
    AnjWHQ,
    AnjWords
} from './anj/General';
import {
    Project1Lesson6SubA,
    Project1Lesson6SubB,
    Project1Lesson6SubC, Project1Lesson6SubCulture,
    Project1Lesson6SubD, Project1Lesson6SubE, Project1Lesson6SubP
} from "./anj/Project1/Lesson6";

export default [
    {
        book: 'English - General',
        sections: [
            {
                section: 'Prepositions',
                questions: AnjPrepositions
            },
            {
                section: 'Wh questions',
                questions: AnjWHQ
            },
            {
                section: 'Days',
                questions: AnjDays
            },
            {
                section: 'Word types',
                questions: AnjWords
            },
            {
                section: 'Conjuctions',
                questions: AnjConjuctions
            },
            {
                section: 'Pronouns',
                subsections: [
                    {
                        subsection: 'Personal',
                        questions: AnjPronounsPersonal
                    },
                    {
                        subsection: 'Posessive',
                        questions: AnjPronounsPossesive
                    },
                ]
            },
        ]
    },
    {
        book: 'English - Project 1',
        sections: [
            // {
            //     section: 'Lesson 1',
            //     subsections: [
            //         {   subsection: 'A ',
            //             questions: [] },
            //         {   subsection: 'B ',
            //             questions: [] },
            //         {   subsection: 'C ',
            //             questions: [] },
            //         {   subsection: 'D ',
            //             questions: [] },
            //         {   subsection: 'Culture',
            //             questions: [] },
            //         {   subsection: 'English',
            //             questions: [] },
            //         {   subsection: 'Project',
            //             questions: [] },
            //     ],
            // },
            // {
            //     section: 'Lesson 2',
            //     subsections: [
            //         {   subsection: 'A ',
            //             questions: [] },
            //         {   subsection: 'B ',
            //             questions: [] },
            //         {   subsection: 'C ',
            //             questions: [] },
            //         {   subsection: 'D ',
            //             questions: [] },
            //         {   subsection: 'Culture',
            //             questions: [] },
            //         {   subsection: 'English',
            //             questions: [] },
            //         {   subsection: 'Project',
            //             questions: [] },
            //     ],
            // },
            // {
            //     section: 'Lesson 3',
            //     subsections: [
            //         {   subsection: 'A ',
            //             questions: [] },
            //         {   subsection: 'B ',
            //             questions: [] },
            //         {   subsection: 'C ',
            //             questions: [] },
            //         {   subsection: 'D ',
            //             questions: [] },
            //         {   subsection: 'Culture',
            //             questions: [] },
            //         {   subsection: 'English',
            //             questions: [] },
            //         {   subsection: 'Project',
            //             questions: [] },
            //     ],
            // },
            // {
            //     section: 'Lesson 4',
            //     subsections: [
            //         {   subsection: 'A ',
            //             questions: [] },
            //         {   subsection: 'B ',
            //             questions: [] },
            //         {   subsection: 'C ',
            //             questions: [] },
            //         {   subsection: 'D ',
            //             questions: [] },
            //         {   subsection: 'Culture',
            //             questions: [] },
            //         {   subsection: 'English',
            //             questions: [] },
            //         {   subsection: 'Project',
            //             questions: [] },
            //     ],
            // },
            {
                section: 'Lesson 5',
                questions: Project1Lesson5,
                subsections: [
                    {   subsection: 'A My room',
                        questions: Project1Lesson5SubA },
                    {   subsection: 'B Our house',
                        questions: Project1Lesson5SubB },
                    {   subsection: 'C Our town',
                        questions: Project1Lesson5SubC },
                    {   subsection: 'D Mickie, Millie, Mut',
                        questions: Project1Lesson5SubD },
                    {   subsection: 'Culture',
                        questions: Project1Lesson5SubCulture },
                    {   subsection: 'English',
                        questions: Project1Lesson5SubE },
                    {   subsection: 'Project',
                        questions: Project1Lesson5SubP },
                ],
            },
            {
                section: 'Lesson 6',
                questions: Project1Lesson5,
                subsections: [
                    {   subsection: 'A My friends',
                        questions: Project1Lesson6SubA },
                    {   subsection: 'B Saturday morning',
                        questions: Project1Lesson6SubB },
                    {   subsection: 'C Shops',
                        questions: Project1Lesson6SubC },
                    {   subsection: 'D Clothes',
                        questions: Project1Lesson6SubD },
                    {   subsection: 'Culture',
                        questions: Project1Lesson6SubCulture },
                    {   subsection: 'English',
                        questions: Project1Lesson6SubE },
                    {   subsection: 'Project',
                        questions: Project1Lesson6SubP },
                ],
            },
        ]
    }
]