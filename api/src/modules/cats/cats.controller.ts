import { Get, Controller, Post, Body, Param, ParseIntPipe, Delete } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags, ApiParam } from "@nestjs/swagger";
import { CatsService } from "./cats.service";
import { CatResponseDto } from "./dto/cat.response.dto";
import { CatCreateDto } from "./dto/cat.create.dto";

@Controller('cats')
@ApiTags('Cats controller')

export class CatsController{

    constructor(
        private catsService: CatsService
    ){

    }

    @Get('')
    @ApiOperation({summary: "Cats list"})
    @ApiOkResponse({
        description: "Cats list",
        type: CatResponseDto,
        isArray: true
    })
    async getAll(): Promise<CatResponseDto[]>{
        return await this.catsService.getAll()
    }

    @Get(':id')
    @ApiOperation({summary: "Cats list"})
    @ApiParam({ name: 'id', description: 'ID', type: 'number' })
    @ApiOkResponse({
        description: "Cats list",
        type: CatResponseDto,
        isArray: false
    })
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<CatResponseDto>{
        return await this.catsService.getOne(id)
    }

    @Post()
    @ApiOperation({summary: "Create cat"})
    @ApiOkResponse({
        description: "Created cat",
        type: CatResponseDto,
        isArray: false
    })
    async create(@Body() payload: CatCreateDto){
        return await this.catsService.create(payload)
    }

    @Delete(':id')
    @ApiOperation({summary: "Delete a cat by ID"})
    @ApiParam({ name: 'id', description: 'ID', type: 'number' })
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.catsService.delete(id)
    }
}