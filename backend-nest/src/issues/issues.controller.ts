import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { Issue } from './issue.entity';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

@Controller('issues')
export class IssuesController {
  constructor(private issuesService: IssuesService) {}

  @Get()
  findAllIssues(): Issue[] {
    return this.issuesService.findAll();
  }

  @Get(':id')
  findIssueById(@Param('id') id: string): Issue {
    return this.issuesService.findOne(id);
  }

  @Post()
  createNewIssue(@Body() createIssueDto: CreateIssueDto): Issue {
    return this.issuesService.create(createIssueDto);
  }

  @Put(':id')
  updateById(
    @Param('id') id: string,
    @Body() updateIssueDto: UpdateIssueDto,
  ): Issue {
    return this.issuesService.update(id, updateIssueDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string): void {
    console.log(`issue id to delete: ${id}`);
    return this.issuesService.delete(id);
  }
}
