import { Injectable, NotFoundException } from '@nestjs/common';
import { Issue } from './issue.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

@Injectable()
export class IssuesService {
  private issues: Issue[] = [
    {
      id: uuidv4(),
      title: 'Issue 1',
      description: 'This is the first issue',
    },
    {
      id: uuidv4(),
      title: 'Issue 2',
      description: 'This is the second issue',
    },
  ]; // this is to simulate a database

  findAll(): Issue[] {
    return this.issues;
  }

  findOne(id: string): Issue {
    const issue = this.issues.find((issue) => issue.id === id);
    if (!issue) {
      throw new NotFoundException(`Issue with ID ${id} not found`);
    }
    return issue;
  }

  create(createIssueDto: CreateIssueDto): Issue {
    console.log(`issue to create: ${JSON.stringify(createIssueDto)}`);

    const newIssue: Issue = { id: uuidv4(), ...createIssueDto };
    this.issues.push(newIssue);
    return newIssue;
  }

  update(id: string, updateIssueDto: UpdateIssueDto): Issue {
    console.log(
      `issue id to be updated: ${id}, new issue: ${JSON.stringify(updateIssueDto)},`,
    );

    const issue = this.findOne(id);
    issue.title = updateIssueDto.title;
    issue.description = updateIssueDto.description;

    return issue;
  }

  delete(id: string): void {
    console.log(`issue id to delete: ${id}`);

    const index = this.issues.findIndex((issue) => issue.id === id);
    if (index === -1) {
      throw new NotFoundException(`Issue with ID ${id} not found`);
    }

    this.issues.splice(index, 1); // remove 1 element sitting on the index
  }
}
