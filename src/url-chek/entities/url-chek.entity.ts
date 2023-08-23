import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UrlCheckLogEntity } from '../../url-chek-log/entities/url-check-log.entity';
import { User } from '../../users/entities/user.entity';

@Entity('url_checks')
export class UrlCheck {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  protocol: string;

  @Column({ nullable: true })
  path?: string;

  @Column({ nullable: true })
  port?: number;

  @Column({ nullable: true })
  webhook?: string;

  @Column({ default: 5 })
  timeout: number;

  @Column({ default: 600 })
  interval: number;

  @Column({ default: 1 })
  threshold: number;

  @Column({ nullable: true })
  authentication_username?: string;

  @Column({ nullable: true })
  authentication_password?: string;

  @Column('jsonb', { nullable: true })
  http_headers: object;

  @Column('jsonb', { nullable: true })
  assert: object;

  @Column('text', { array: true, nullable: true })
  tags?: string[];

  @Column({ default: false })
  ignore_ssl: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.urlChecks)
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Column()
  userId: number;

  @OneToMany(() => UrlCheckLogEntity, (log) => log.urlCheckId)
  logs?: UrlCheckLogEntity[]; // Establish the one-to-many relationship

  @Column({ nullable: true })
  status?: number;
}
