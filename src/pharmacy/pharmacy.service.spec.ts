import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyService } from './pharmacy.service';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';

describe('PharmacyService', () => {
  let service: PharmacyService;
  let mockModel;

  beforeEach(async () => {
    mockModel = {
      findOne: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      exec: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PharmacyService,
        {
          provide: getModelToken('Pharmacy'),
          useValue: mockModel
        }
      ],
    }).compile();

    service = module.get<PharmacyService>(PharmacyService);
  });

  describe('remove', () => {
    it('should return not found message', async () => {
      mockModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null)
      });

      const result = await service.remove('testid');
      expect(result).toBe('ops smth went wrong');
    });
  });
});