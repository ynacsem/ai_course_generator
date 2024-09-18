import { boolean, integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CourseList =pgTable('CourseList',{
    id:serial('id').primaryKey(),
    courseId:varchar('courseId').notNull(),
    name:varchar('name').notNull(),
    category:varchar('category').notNull(),
    level:varchar('level').notNull(),
    courseOutput:json('courseOutput').notNull(),
    createdBy:varchar('createdBy').notNull(),
    userName:varchar('userName'),
    userProfileImage:varchar('userProfileImage'),
    includeVideo:varchar('includeVideo').notNull().default('Yes'),
    courseBanner:varchar('courseBanner').default('/img/300x300.svg'),
    publish:boolean('publish').notNull().default(false)
})
export const Chapters = pgTable('Chapters',{
    id:serial('id').primaryKey(),
    courseId:varchar('courseId').notNull(),
    chapterId:integer('chapterId').notNull(),
    content:json('content').notNull(),
    videoId:varchar('videoId').notNull(),
})