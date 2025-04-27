import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    description: 'The access token of the user',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZjEzNjNjZC04MDNlLTQ5OTQtYWFjNi0yYmJiYjljZTZhYmEiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwidXNlcm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTc0NTc1ODc1OSwiZXhwIjoxNzQ1NzYyMzU5fQ.cvLNlVFdmXW1ui-9Ep1ai5x6y1N6o-cuc9-AmX4Di3o',
  })
  token: string;

  @ApiProperty({
    description: 'The access time of the token',
    example: 3600,
  })
  accessTime: number;

  @ApiProperty({
    description: 'The cookie of the user',
    example:
      'Refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZjEzNjNjZC04MDNlLTQ5OTQtYWFjNi0yYmJiYjljZTZhYmEiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwidXNlcm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTc0NTc1ODc1OSwiZXhwIjoxNzQ2MzYzNTU5fQ.5Ls--zZyDHTLRs9AmjL6OaN8O2YjvDnkU4aR8q_fQ_M; HttpOnly; Path=/; Max-Age=604800',
  })
  cookie: string;
}

export class LoginResponse {
  @ApiProperty({
    description: 'The access token cookie of the user',
    type: TokenDto,
  })
  accessTokenCookie: TokenDto;

  @ApiProperty({
    description: 'The refresh token cookie of the user',
    type: TokenDto,
  })
  refreshTokenCookie: TokenDto;
}
